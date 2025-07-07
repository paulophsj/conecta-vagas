import { useState } from 'react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState({});

  // Perfis disponíveis
  const profiles = [
    { id: 1, name: 'João', avatar: '👨', online: true },
    { id: 2, name: 'Maria', avatar: '👩', online: true },
    { id: 3, name: 'Carlos', avatar: '🧔', online: false },
    { id: 4, name: 'Ana', avatar: '👧', online: true },
  ];

  // Perfil atual do usuário (você)
  const myProfile = { id: 0, name: 'Você', avatar: '😊', online: true };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const selectProfile = (profile) => {
    setActiveProfile(profile);
    // Inicializa conversa se não existir
    if (!conversations[profile.id]) {
      setConversations(prev => ({
        ...prev,
        [profile.id]: [
          { sender: profile, text: `Olá ${myProfile.name}! Como posso ajudar?`, time: '10:30' }
        ]
      }));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && activeProfile) {
      const newMessage = {
        sender: myProfile,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => ({
        ...prev,
        [activeProfile.id]: [...(prev[activeProfile.id] || [], newMessage)]
      }));

      // Simula resposta após 1 segundo
      setTimeout(() => {
        const replyMessage = {
          sender: activeProfile,
          text: `Resposta à: "${message}"`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setConversations(prev => ({
          ...prev,
          [activeProfile.id]: [...(prev[activeProfile.id] || []), replyMessage]
        }));
      }, 1000);

      setMessage('');
    }
  };

  return (
    <>
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Cabeçalho */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">
              {activeProfile ? `Conversando com ${activeProfile.name}` : 'Selecione um contato'}
            </h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Corpo do chat */}
          <div className="flex-1 flex overflow-hidden">
            {/* Lista de contatos */}
            {!activeProfile ? (
              <div className="w-full overflow-y-auto">
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <input 
                    type="text" 
                    placeholder="Buscar contatos..." 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {profiles.map(profile => (
                  <div
                    key={profile.id}
                    onClick={() => selectProfile(profile)}
                    className={`flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      !profile.online ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="relative">
                      <span className="text-2xl">{profile.avatar}</span>
                      {profile.online && (
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-xs text-gray-500">
                        {conversations[profile.id]?.slice(-1)[0]?.text || 'Clique para conversar'}
                      </p>
                    </div>
                    {conversations[profile.id] && (
                      <span className="text-xs text-gray-400">
                        {conversations[profile.id].slice(-1)[0]?.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Área de conversa */
              <div className="w-full flex flex-col">
                {/* Cabeçalho da conversa */}
                <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center">
                    <button 
                      onClick={() => setActiveProfile(null)}
                      className="mr-2 text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-xl mr-2">{activeProfile.avatar}</span>
                    <div>
                      <p className="font-medium">{activeProfile.name}</p>
                      <p className="text-xs text-gray-500">
                        {activeProfile.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mensagens */}
                <div className="flex-1 p-3 overflow-y-auto bg-gray-100">
                  <div className="space-y-2">
                    {conversations[activeProfile.id]?.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.sender.id === myProfile.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg ${
                            msg.sender.id === myProfile.id
                              ? 'bg-blue-500 text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none'
                          }`}
                        >
                          {msg.sender.id !== myProfile.id && (
                            <p className="font-bold text-xs mb-1">{msg.sender.name}</p>
                          )}
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender.id === myProfile.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input de mensagem */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Digite uma mensagem..."
                      className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-4 rounded-r-lg disabled:opacity-50"
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
    </>
  );
}