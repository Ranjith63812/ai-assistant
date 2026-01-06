import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Plus, MessageSquare, Mic } from 'lucide-react';
import './index.css';

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Hello! I am your AI assistant. How can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Connect to Python Backend
            const response = await axios.post('http://localhost:8000/chat', {
                message: input
            });

            const aiMessage = { role: 'ai', content: response.data.response };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage = {
                role: 'ai',
                content: `Error: ${error.response?.data?.detail || error.message || 'Could not connect to server.'}. Make sure the backend is running.`
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice input is not supported in this browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev + ' ' + transcript);
        };

        recognition.start();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="brand">
                    <Bot size={24} className="text-blue-500" />
                    <span>AI Assistant</span>
                </div>
                <button className="new-chat-btn" onClick={() => setMessages([])}>
                    <Plus size={18} />
                    New Chat
                </button>

                <div style={{ marginTop: '1rem' }}>
                    <div className="history-item">
                        <MessageSquare size={16} style={{ display: 'inline', marginRight: '8px' }} />
                        Previous Conversation
                    </div>
                    {/* Mock history */}
                </div>
            </aside>

            {/* Main Chat */}
            <main className="chat-area">
                <div className="messages-container">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.role}`}>
                            <div className="avatar">
                                {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                            </div>
                            <div className="message-content">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message ai">
                            <div className="avatar"><Bot size={20} /></div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="input-area">
                    <div className="input-container">
                        <textarea
                            className="chat-input"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        />
                        <button
                            className={`mic-btn ${isListening ? 'listening' : ''}`}
                            onClick={handleVoiceInput}
                            title="Speak"
                        >
                            <Mic size={18} />
                        </button>
                        <button className="send-btn" onClick={handleSend} disabled={isLoading || !input.trim()}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
