
"use client";

import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, History, MessageSquare, BookOpen, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span className="font-headline font-bold text-xl tracking-tight text-primary">OncoGuard AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="transition-colors hover:text-primary flex items-center gap-1.5">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/history" className="transition-colors hover:text-primary flex items-center gap-1.5">
            <History className="h-4 w-4" />
            History
          </Link>
          <Link href="/chatbot" className="transition-colors hover:text-primary flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </Link>
          <Link href="/awareness" className="transition-colors hover:text-primary flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            Learn
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="default" size="sm" asChild className="hidden md:flex bg-primary hover:bg-primary/90">
            <Link href="/assessment">Start Assessment</Link>
          </Button>
          
          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/history">History</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/chatbot">Ask AI</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/awareness">Awareness</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="bg-primary text-white focus:bg-primary/90 focus:text-white">
                <Link href="/assessment">Start Assessment</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
