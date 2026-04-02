
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, ShieldAlert, Loader2, Sparkles } from 'lucide-react';
import { aiHealthChatbot } from '@/ai/flows/ai-health-chatbot-flow';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I am your OncoGuard AI assistant. I can answer questions about breast/ovarian cancer symptoms, prevention, and general lifestyle advice. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await aiHealthChatbot({ query: userMessage });
      setMessages(prev => [...prev, { role: 'bot', content: response.response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: "I'm sorry, I'm having trouble processing that right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12 flex flex-col h-[calc(100vh-140px)]">
      <Card className="flex-1 flex flex-col shadow-xl overflow-hidden border-2">
        <CardHeader className="border-b bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div>
              <CardTitle>OncoGuard Health AI</CardTitle>
              <CardDescription className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                Online & Ready to Help
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 overflow-hidden relative">
          <div className="absolute top-0 w-full p-3 bg-yellow-50 border-b flex items-center gap-2 z-10 text-[10px] md:text-xs text-yellow-800 font-medium">
            <ShieldAlert className="h-3 w-3 shrink-0" />
            NON-DIAGNOSTIC ADVICE ONLY. CONSULT A DOCTOR FOR MEDICAL CONCERNS.
          </div>
          
          <ScrollArea className="h-full p-4 pt-12" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                  {m.role === 'bot' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary text-white"><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-white border rounded-tl-none text-slate-700'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                  {m.role === 'user' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-secondary text-primary font-bold text-xs">ME</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start items-start gap-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback className="bg-primary text-white"><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="bg-white border rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground italic">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t bg-slate-50">
          <form 
            className="flex w-full gap-2" 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <Input 
              placeholder="Ask about symptoms, prevention, or self-exams..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white h-12 text-base rounded-xl"
              disabled={loading}
            />
            <Button type="submit" size="icon" className="h-12 w-12 rounded-xl bg-primary" disabled={loading || !input.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <p className="w-full text-center text-xs text-muted-foreground mb-1 font-medium">Try asking:</p>
        {[
          "How to perform a breast self-exam?",
          "What are early signs of ovarian cancer?",
          "How can lifestyle changes reduce risk?",
          "What screenings are recommended at age 40?"
        ].map((tip, i) => (
          <Button 
            key={i} 
            variant="outline" 
            size="sm" 
            className="text-[10px] md:text-xs rounded-full bg-white hover:bg-primary/5"
            onClick={() => setInput(tip)}
          >
            <Sparkles className="h-3 w-3 mr-1 text-accent" />
            {tip}
          </Button>
        ))}
      </div>
    </div>
  );
}
