import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { LightBulbIcon, SparklesIcon } from './icons/Icons';

interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

const SmartRecommendations: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Initialize Chat
    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are 'SPRINT AI', an expert strategic advisor for the Indonesian Coordinating Ministry for Human Development and Culture (Kemenko PMK). Your goal is to provide data-driven, actionable, and context-aware recommendations for Early Childhood Development (PAUD HI) policies and interventions in Indonesia. Always communicate in a professional, clear, and helpful manner in Bahasa Indonesia. When providing recommendations, structure them with clear rationales and actionable steps using markdown for formatting.",
                }
            });
            setChat(chatSession);

            // Initial greeting from AI
            setChatHistory([{
                role: 'model',
                content: "Selamat datang di SPRINT AI. Saya siap membantu Anda menyusun strategi dan rekomendasi untuk program PAUD-HI. Apa yang ingin Anda diskusikan hari ini?"
            }]);
        } catch (e) {
            console.error(e);
            setError("Gagal menginisialisasi SPRINT AI. Pastikan API Key sudah dikonfigurasi.");
        }
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, isLoading]);

    const handleSendMessage = async (messageText: string) => {
        if (isLoading || !messageText.trim() || !chat) return;

        setIsLoading(true);
        setError(null);
        setUserInput('');

        const userMessage: ChatMessage = { role: 'user', content: messageText };
        // Add user message and a placeholder for model response
        setChatHistory(prev => [...prev, userMessage, { role: 'model', content: '' }]);

        try {
            const stream = await chat.sendMessageStream({ message: messageText });

            let modelResponse = '';
            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].content = modelResponse;
                    return newHistory;
                });
            }
        } catch (e) {
            console.error(e);
            const errorMessage = "Maaf, terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi.";
            setError(errorMessage);
            setChatHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].content = errorMessage;
                return newHistory;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(userInput);
    };

    const starterPrompts = [
        "Bantu saya analisis domain Gizi untuk wilayah risiko tinggi.",
        "Buatkan program intervensi untuk stunting di Papua.",
        "Apa saja praktik terbaik untuk meningkatkan partisipasi PAUD?",
    ];

    const TypingIndicator = () => (
        <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
        </div>
    );
    
    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
            <div className="flex-shrink-0 p-4 border-b border-slate-200 flex items-center">
                <LightBulbIcon className="w-6 h-6 mr-3 text-yellow-500"/>
                <h2 className="text-xl font-bold text-slate-800">Diskusi Rekomendasi SPRINT</h2>
            </div>

            <div ref={chatContainerRef} className="flex-grow p-6 overflow-y-auto space-y-6">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
                                <SparklesIcon className="w-5 h-5" />
                            </div>
                        )}
                        <div className={`w-full max-w-xl p-4 rounded-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                             {msg.content ? (
                                <div className="prose prose-sm max-w-none prose-p:my-2 prose-li:my-1" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
                             ) : (
                                <TypingIndicator />
                             )}
                        </div>
                    </div>
                ))}
                 {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            </div>

            {chatHistory.length <= 1 && (
                <div className="p-6 pt-0">
                    <p className="text-sm font-semibold text-slate-500 mb-2">atau coba salah satu dari ini:</p>
                    <div className="flex flex-wrap gap-2">
                        {starterPrompts.map(prompt => (
                             <button key={prompt} onClick={() => handleSendMessage(prompt)} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors">
                                {prompt}
                             </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex-shrink-0 p-4 border-t border-slate-200 bg-slate-50">
                <form onSubmit={handleFormSubmit} className="relative">
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleFormSubmit(e);
                            }
                        }}
                        disabled={isLoading}
                        rows={1}
                        placeholder="Ketik pesan Anda di sini atau ajukan pertanyaan..."
                        className="w-full p-3 pr-12 text-sm text-slate-800 border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                        aria-label="Kirim pesan"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
                <p className="text-xs text-slate-400 text-center mt-2">SPRINT AI dapat membuat kesalahan. Verifikasi informasi penting.</p>
            </div>
        </div>
    );
};

export default SmartRecommendations;