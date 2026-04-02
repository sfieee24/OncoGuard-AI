
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, ArrowLeft, ExternalLink, Activity, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Assessment {
  id: string;
  risk: string;
  confidence: number;
  date: string;
}

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('onco_assessments');
    if (saved) {
      setAssessments(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
        <div>
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-headline mb-2 flex items-center gap-3">
            <History className="h-8 w-8 text-primary" />
            Assessment History
          </h1>
          <p className="text-muted-foreground">Detailed logs of all your health risk assessments over time.</p>
        </div>
        <Button asChild className="bg-primary">
          <Link href="/assessment">New Assessment</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reports..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {assessments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell>
                      <Badge variant={item.risk === 'High' ? 'destructive' : item.risk === 'Medium' ? 'secondary' : 'default'}>
                        {item.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>{(item.confidence * 100).toFixed(0)}%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/results?id=${item.id}`}>
                          View Details
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <Activity className="h-12 w-12 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">No assessments found in your history.</p>
              <Button variant="outline" asChild>
                <Link href="/assessment">Run your first assessment</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
