import { useState, useEffect, useRef, createContext } from 'react';
import SockJS from 'sockjs-client';
import { Client } from "@stomp/stompjs";
import { findAllUserChats, findOneChat } from '@/api/Chat';
import { useUser } from '../UserContext';

export const chatContext = createContext(null)

export default function Chat({ children }) {
  const { user } = useUser()

  const [showButton, setShowButton] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensagens, setMensagens] = useState([]);

  const stompClients = useRef({});
  const inputRef = useRef(null)

  useEffect(() => {
    if (user === null) setShowButton(false)
    else setShowButton(true)
  }, [user])

  useEffect(() => {
    const div = document.getElementById("divMensagem")
    if (div) {
      div.scrollTop = div.scrollHeight
    }
  }, [mensagens])

  const setupWebSocketForChat = (chatId) => {
    if (stompClients.current[chatId]) return;

    const socket = new SockJS("http://10.195.107.67:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(`Conectado ao WebSocket para o chat ${chatId}`);

        client.subscribe(`/chat/mensagem/${chatId}`, (message) => {
          const novaMensagem = JSON.parse(message.body);

          // Atualiza a lista de mensagens do chat ativo
          setMensagens(prev => {
            // Se o chat ativo é o que recebeu a mensagem, adiciona a nova mensagem
            if (activeChat && activeChat.id === chatId) {
              return [...prev, novaMensagem];
            }
            return prev;
          });

          // Atualiza a lista de chats com a última mensagem
          setChats(prev => prev.map(chat =>
            chat.id === chatId
              ? {
                ...chat,
                mensagens: [...(chat.mensagens || []), novaMensagem],
                lastMessage: novaMensagem
              }
              : chat
          ));
        });
      },
      onStompError: (frame) => {
        console.error(`Erro no STOMP para chat ${chatId}:`, frame);
      }
    });

    client.activate();
    stompClients.current[chatId] = client;
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await findAllUserChats();

      response.forEach(chat => {
        setupWebSocketForChat(chat.id);
      });

      setChats(response.map(chat => ({
        ...chat,
        lastMessage: chat.mensagens?.slice(-1)[0]
      })));

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Erro ao carregar chats');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchChats();
    }

    // Cleanup all WebSocket connections when component unmounts or chat closes
    return () => {
      Object.values(stompClients.current).forEach(client => {
        client.deactivate();
      });
      stompClients.current = {};
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && activeChat) {
      setActiveChat(null); // Reset active chat when closing
    }
  };

  useEffect(() => {
    if (activeChat) {
      // Encontra o chat ativo na lista de chats para pegar as mensagens mais recentes
      const chatAtual = chats.find(chat => chat.id === activeChat.id);
      if (chatAtual) {
        setMensagens(chatAtual.mensagens || []);
      }
    }
  }, [activeChat, chats]);

  const selectChat = async (chat) => {
    try {
      setActiveChat(chat);
      // Carrega as mensagens do servidor para garantir que temos o estado mais recente
      const messages = await findOneChat(chat.id);
      setMensagens(messages.mensagens || []);

      // Atualiza o chat na lista de chats com as mensagens mais recentes
      setChats(prev => prev.map(c =>
        c.id === chat.id
          ? { ...c, mensagens: messages.mensagens || [], lastMessage: messages.mensagens?.slice(-1)[0] }
          : c
      ));
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat) return;

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("type");
    const client = stompClients.current[activeChat.id];

    if (!client?.connected) {
      console.error("WebSocket not connected");
      return;
    }

    try {
      await client.publish({
        destination: "/api/mensagem",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          conteudo: message,
          idChat: activeChat.id,
          enviadoPorCandidato: userType !== "recrutador"
        }),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const getOtherUser = (chat) => {
    const userType = localStorage.getItem("type");
    return userType === "recrutador" ? chat.candidato : chat.recrutador;
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';

    try {
      const date = new Date(dateTimeString);
      return isNaN(date.getTime())
        ? ''
        : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <>
      {showButton && (
        <div className="fixed bottom-0 z-50 flex flex-col items-end">
          {isOpen && (
            <div className="z-50 fixed bottom-0 right-0 w-full h-full lg:w-96 lg:h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
              {/* Header */}
              <div className="bg-blue-500 dark:bg-blue-600 text-white p-3 lg:rounded-t-lg flex justify-between items-center">
                <h3 className="font-semibold">
                  {activeChat ? `Conversando com ${(getOtherUser(activeChat).nome || getOtherUser(activeChat).nomeEmpresa)}` : 'Selecione um chat'}
                </h3>
                <button onClick={toggleChat} className="text-white hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Chat body */}
              <div className="flex-1 flex overflow-hidden">
                {/* Chat list */}
                {!activeChat ? (
                  <div className="w-full overflow-y-auto">
                    {loading ? (
                      <div className="p-4 text-center dark:text-gray-300">Carregando chats...</div>
                    ) : error ? (
                      <div className="p-4 text-center text-red-500 dark:text-red-400">{error}</div>
                    ) : (
                      <>
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                          <input
                            type="text"
                            placeholder="Buscar chats..."
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        {chats.map(chat => {
                          const otherUser = getOtherUser(chat);
                          return (
                            <div
                              key={chat.id}
                              onClick={() => selectChat(chat)}
                              className="flex items-center p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <div className="relative">
                                <span className="text-2xl dark:text-gray-300">{(otherUser.nome || otherUser.nomeEmpresa)?.charAt(0)}</span>
                              </div>
                              <div className="ml-3 flex-1">
                                <p className="font-medium dark:text-gray-200">{otherUser.nome || otherUser.nomeEmpresa}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {chat.lastMessage?.conteudo || 'Clique para conversar'}
                                </p>
                              </div>
                              {chat.lastMessage && (
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                  {formatDateTime(chat.lastMessage.horaMensagem)}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full flex flex-col">
                    {/* Conversation header */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center">
                        <button
                          onClick={() => setActiveChat(null)}
                          className="mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="text-xl mr-2 dark:text-gray-300">{(getOtherUser(activeChat).nome || getOtherUser(activeChat).nomeEmpresa).charAt(0)}</span>
                        <div>
                          <p className="font-medium dark:text-gray-200">{(getOtherUser(activeChat).nome || getOtherUser(activeChat).nomeEmpresa)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div id='divMensagem' className="transition-all ease-in flex-1 p-3 overflow-y-auto bg-gray-100 dark:bg-gray-900">
                      <div className="space-y-2">
                        {mensagens.map((mensagem, index) => (
                          <div
                            key={index}
                            className={`flex ${mensagem.enviadoPorCandidato === (localStorage.getItem("type") === "recrutador") ? 'justify-start' : 'justify-end'}`}
                          >
                            <div
                              className={`max-w-xs p-3 rounded-lg ${mensagem.enviadoPorCandidato === (localStorage.getItem("type") === "recrutador")
                                ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                                : 'bg-blue-500 dark:bg-blue-600 text-white rounded-br-none'
                                }`}
                            >
                              {String(mensagem.conteudo).includes("www.") ?
                                <a target='_blank' className={`${localStorage.getItem("type") === "recrutador" ? 'text-blue-500 dark:text-blue-400' : 'text-white'} underline`} href={mensagem.conteudo}>{mensagem.conteudo}</a> :
                                <p>{mensagem.conteudo}</p>
                              }
                              <p className={`text-xs mt-1 ${mensagem.enviadoPorCandidato === (localStorage.getItem("type") === "recrutador")
                                ? 'text-gray-500 dark:text-gray-400'
                                : 'text-blue-100 dark:text-blue-200'
                                }`}>
                                {formatDateTime(mensagem.horaMensagem)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message input */}
                    <form id='inputMessage' onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                      <div className="flex items-center border border-blue-400 dark:border-blue-500 rounded-lg overflow-hidden">
                        <input
                          ref={inputRef}
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Digite uma mensagem..."
                          className="flex-1 p-2 border-none focus:outline-none focus:ring-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                        <button
                          type="submit"
                          disabled={!message.trim()}
                          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-2 disabled:opacity-50"
                        >
                          Enviar
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Floating button */}
          <button
            onClick={toggleChat}
            className={`fixed ${isOpen ? "hidden" : ""} bottom-6 right-6 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white p-4 rounded-full shadow-lg items-center justify-center`}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>
        </div>
      )}
      <chatContext.Provider value={{ fetchChats, setIsOpen }}>
        {children}
      </chatContext.Provider>
    </>
  );
}