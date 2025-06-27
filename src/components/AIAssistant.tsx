
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { toast } from 'sonner';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your TrekHive AI assistant. How can I help you find your perfect adventure today?",
      isBot: true,
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response (in real app, this would call Gemini API)
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you find the perfect trek! What type of adventure are you looking for?",
        "Based on your location, I can recommend some amazing nearby treks. Would you like me to show you some options?",
        "Great question! Let me help you with that. What's your experience level with trekking?",
        "I can help you plan an amazing adventure! What's your budget and preferred duration?",
      ];
      
      const botResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    toast.success('Message sent to AI assistant');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 bg-teal-600 hover:bg-teal-700 shadow-lg animate-float"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 animate-fade-scale">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-teal-600 text-white rounded-t-lg pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                AI Trek Assistant
              </CardTitle>
              <p className="text-teal-100 text-sm">Powered by Gemini AI</p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-teal-600 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about treks, destinations..."
                    className="flex-1 border-gray-200 focus:border-teal-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Try: "Find treks near me under ₹5000" or "Plan a weekend adventure"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
