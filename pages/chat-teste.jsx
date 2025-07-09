// pages/chat-teste.js
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function ChatTestePage() {
    const [mensagens, setMensagens] = useState([]);
    const [conteudo, setConteudo] = useState("");
    const [idChat, setIdChat] = useState("1"); // você pode mudar para um ID real
    const stompClient = useRef(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws"); // ajuste para sua porta backend
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Conectado");

                // Inscreve no canal do chat
                stompClient.current.subscribe(`/chat/${idChat}`, (message) => {
                    console.log("Mensagem recebida via WebSocket:", message.body);
                    const novaMensagem = JSON.parse(message.body);
                    setMensagens((prev) => [...prev, novaMensagem]);
                });

            },
        });

        stompClient.current.activate();

        return () => {
            stompClient.current.deactivate();
        };
    }, [idChat]);

    const enviarMensagem = () => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({
                destination: "/api/mensagem", // corresponde ao @MessageMapping("/mensagem")
                body: JSON.stringify({
                    conteudo,
                    idChat: parseInt(idChat),
                    enviadoPorCandidato: true, // ou false dependendo do tipo de usuário
                }),
            });
            setConteudo("");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Chat WebSocket Teste</h1>

            <label>
                ID do Chat:
                <input
                    type="text"
                    value={idChat}
                    onChange={(e) => setIdChat(e.target.value)}
                />
            </label>

            <div style={{ marginTop: "1rem" }}>
                <input
                    type="text"
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    placeholder="Digite sua mensagem"
                />
                <button onClick={enviarMensagem}>Enviar</button>
            </div>

            <div style={{ marginTop: "2rem" }}>
                <h2>Mensagens:</h2>
                <ul>
                    {mensagens.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.enviadoPorCandidato ? "Candidato:" : "Recrutador:"}</strong> {msg.conteudo}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
