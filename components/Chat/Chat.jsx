import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from "@stomp/stompjs";
import { findAllUserChats, findOneChat } from '@/api/Chat';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const stompClient = useRef(null);

  useEffect(() => {
    const div = document.getElementById("divMensagem")
    if (div) {
      div.scrollTop = div.scrollHeight
    }
  }, [mensagens])
  // Perfil atual do usuário (você)
  const myProfile = { id: 0, name: 'Você', avatar: '😊', online: true };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const response = await findAllUserChats();
        setChats(response);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Erro ao carregar chats');
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchChats();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && activeChat) {
      setActiveChat(null); // Resetar chat ativo ao fechar
    }
  };

  const connectWebSocket = async (chatId) => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: async () => {
        console.log("Conectado ao WebSocket");

        stompClient.current.subscribe(`/chat/mensagem/${chatId}`, async (message) => {
          const novaMensagem = JSON.parse(message.body);
          setMensagens(prev => [...prev, novaMensagem]);
          setChats(prev => prev.map(chat =>
            chat.id === chatId ? {
              ...chat,
              mensagens: [...(chat.mensagens || []), novaMensagem]
            } : chat
          ));
        });
      },
      onStompError: (frame) => {
        console.error("Erro no STOMP:", frame);
      }
    });

    stompClient.current.activate();
  };

  const selectChat = async (chat) => {
    try {
      setActiveChat(chat);
      connectWebSocket(chat.id);
      const messages = await findOneChat(chat.id);
      setMensagens(messages.mensagens);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeChat || !stompClient.current?.connected) return;

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("type");

    try {
      // Envia a mensagem via WebSocket
      await stompClient.current.publish({
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
      setMensagens(prev => prev.filter(m => m !== novaMensagem));
    }
    finally {
      setMessage('')
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Cabeçalho */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">
              {activeChat ? `Conversando com ${(getOtherUser(activeChat).nome || getOtherUser(activeChat).nomeEmpresa)}` : 'Selecione um chat'}
            </h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Corpo do chat */}
          <div className="flex-1 flex overflow-hidden">
            {/* Lista de chats */}
            {!activeChat ? (
              <div className="w-full overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center">Carregando chats...</div>
                ) : error ? (
                  <div className="p-4 text-center text-red-500">{error}</div>
                ) : (
                  <>
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <input
                        type="text"
                        placeholder="Buscar chats..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {chats.map(chat => {
                      const otherUser = getOtherUser(chat);
                      const lastMessage = chat.mensagens?.slice(-1)[0];
                      return (
                        <div
                          key={chat.id}
                          onClick={() => selectChat(chat)}
                          className="flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                        >
                          <div className="relative">
                            <span className="text-2xl">{(otherUser.nome || otherUser.nomeEmpresa)?.charAt(0)}</span>
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="font-medium">{otherUser.nome || otherUser.nomeEmpresa}</p>
                            <p className="text-xs text-gray-500">
                              {lastMessage?.conteudo || 'Clique para conversar'}
                            </p>
                          </div>
                          {lastMessage && (
                            <span className="text-xs text-gray-400">
                              {formatDateTime(lastMessage.horaMensagem)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              /* Área de conversa */
              <div className="w-full flex flex-col">
                {/* Cabeçalho da conversa */}
                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center">
                    <button
                      onClick={() => setActiveChat(null)}
                      className="mr-2 text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-xl mr-2">{(getOtherUser(activeChat).nome || getOtherUser(activeChat).nomeEmpresa).charAt(0)}</span>
                    <div>
                      <p className="font-medium">{(getOtherUser(activeChat).nome || getOtherUser(activeChat).nomeEmpresa)}</p>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                </div>

                {/* Mensagens */}
                <div id='divMensagem' className="transition-all ease-in flex-1 p-3 overflow-y-auto bg-gray-100">
                  <div className="space-y-2">
                    {mensagens.map((mensagem, index) => (
                      <div
                        key={index}
                        className={`flex ${mensagem.enviadoPorCandidato === (localStorage.getItem("type") === "recrutador") ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${mensagem.enviadoPorCandidato === (localStorage.getItem("type") === "recrutador")
                            ? 'bg-white text-gray-800 rounded-bl-none'
                            : 'bg-blue-500 text-white rounded-br-none'
                            }`}
                        >
                          <p>{mensagem.conteudo}</p>
                          <p className={`text-xs mt-1 ${mensagem.enviadoPorCandidato === (localStorage.getItem("type") === "recrutador")
                            ? 'text-gray-500'
                            : 'text-blue-100'
                            }`}>
                            {formatDateTime(mensagem.horaMensagem)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input de mensagem */}
                <form id='inputMessage' onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center border border-blue-400 rounded-lg overflow-hidden">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite uma mensagem..."
                      className="flex-1 p-2 border-none focus:outline-none focus:ring-0"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 disabled:opacity-50"
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

      {/* Botão flutuante */}
      <button
        onClick={toggleChat}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
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
  );
}