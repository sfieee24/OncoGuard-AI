
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Activity, ShieldCheck, MessageSquare, Plus, ArrowRight, History, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Assessment {
  id: string;
  risk: string;
  confidence: number;
  date: string;
}

export default function Dashboard() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    // Simulate fetching from Firestore
    const saved = localStorage.getItem('onco_assessments');
    if (saved) {
      setAssessments(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Monitor your health risk status and access AI-powered guidance.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none h-11 bg-primary">
            <Link href="/assessment">
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </Link>
          </Button>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Stats/Actions */}
        <div className="md:col-span-2 space-y-8">
          <Card className="border-2 border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Recent Assessment</CardTitle>
                </div>
                {assessments.length > 0 && (
                  <Badge variant={assessments[0].risk === 'High' ? 'destructive' : assessments[0].risk === 'Medium' ? 'secondary' : 'default'} className="px-3">
                    {assessments[0].risk} Risk
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-8 text-center md:text-left">
              {assessments.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1">
                    <p className="text-muted-foreground mb-4">Your last check was on <strong>{assessments[0].date}</strong>. Our AI model predicted a <strong>{assessments[0].risk}</strong> risk level with <strong>{(assessments[0].confidence * 100).toFixed(0)}%</strong> confidence.</p>
                    <Button variant="outline" className="rounded-full" asChild>
                      <Link href={`/results?id=${assessments[0].id}`}>View Detailed Report</Link>
                    </Button>
                  </div>
                  <div className="h-32 w-32 rounded-full border-8 border-primary/20 flex items-center justify-center text-primary relative">
                    <span className="text-3xl font-bold">{(assessments[0].confidence * 100).toFixed(0)}%</span>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle 
                        cx="64" cy="64" r="58" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="8"
                        strokeDasharray={364}
                        strokeDashoffset={364 - (364 * assessments[0].confidence)}
                        className="text-primary transition-all duration-1000"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground max-w-sm">You haven't completed a risk assessment yet. Start your first assessment to see your results here.</p>
                  <Button asChild variant="secondary">
                    <Link href="/assessment">Get Started Now</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Past Reports
              </h3>
              <Link href="/history" className="text-sm text-primary font-medium hover:underline">View All</Link>
            </div>
            <div className="grid gap-4">
              {assessments.slice(1, 4).map((item) => (
                <div key={item.id} className="p-4 rounded-xl border bg-white flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      item.risk === 'High' ? 'bg-red-100 text-red-600' : 
                      item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      <Activity className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.risk} Risk</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground">{(item.confidence * 100).toFixed(0)}% Conf.</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
              {assessments.length <= 1 && (
                <p className="text-center py-6 text-muted-foreground bg-slate-50 rounded-xl border border-dashed italic">No other history found.</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card className="bg-primary text-white border-none shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Ask OncoGuard AI</CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Have questions about symptoms or breast health? Chat with our AI assistant.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/chatbot">Start Chatting</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Awareness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">01</div>
                <p className="text-sm font-medium">Monthly Self-Exam Guide</p>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">02</div>
                <p className="text-sm font-medium">Ovarian Cancer Signs</p>
              </div>
              <Button variant="link" className="px-0 h-auto text-primary" asChild>
                <Link href="/awareness">View educational resources</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
