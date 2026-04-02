
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { explainRisk, type AiRiskExplanationOutput } from '@/ai/flows/ai-risk-explanation-flow';
import { Loader2, AlertTriangle, ShieldCheck, ArrowLeft, RefreshCw, Printer, Download, UserCircle, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [data, setData] = useState<any>(null);
  const [aiResult, setAiResult] = useState<AiRiskExplanationOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const last = localStorage.getItem('last_assessment');
      if (last) {
        try {
          const parsed = JSON.parse(last);
          setData(parsed);

          const symptoms = [
            parsed.breastLump === 'yes' ? 'Breast lump: Yes' : 'Breast lump: No',
            parsed.pain === 'yes' ? 'Pain: Yes' : 'Pain: No',
            parsed.irregularPeriods === 'yes' ? 'Irregular periods: Yes' : 'Irregular periods: No',
            parsed.bloating === 'yes' ? 'Abdominal bloating: Yes' : 'Abdominal bloating: No',
          ].join(', ');

          const explanation = await explainRisk({
            riskLevel: (parsed.risk || 'Low') as 'Low' | 'Medium' | 'High',
            confidence: parsed.confidence || 0,
            gender: parsed.gender || 'unknown',
            age: parseInt(parsed.age) || 0,
            symptoms: symptoms,
            familyHistory: parsed.familyHistory === 'yes' ? 'History reported' : 'No history',
            lifestyle: `Smoking: ${parsed.smoking}, Alcohol: ${parsed.alcohol}`,
            contributingFactors: `Age (${parsed.age}), Breast Lump (${parsed.breastLump}), Family History (${parsed.familyHistory})`
          });
          setAiResult(explanation);
        } catch (error) {
          console.error("Data processing or AI Error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        router.push('/dashboard');
      }
    }
    loadData();
  }, [id, router]);

  if (loading || !data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-bold font-headline">Analyzing your health profile...</h2>
        <p className="text-muted-foreground animate-pulse text-center max-w-xs">Connecting to Gemini AI for personalized explanations and next steps.</p>
      </div>
    );
  }

  const riskColor = data?.risk === 'High' ? 'bg-red-500' : data?.risk === 'Medium' ? 'bg-yellow-500' : 'bg-green-500';
  const riskTextColor = data?.risk === 'High' ? 'text-red-600' : data?.risk === 'Medium' ? 'text-yellow-600' : 'text-green-600';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-1 overflow-hidden h-full border-t-4 border-t-primary">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-muted-foreground font-medium text-sm uppercase tracking-wider">Risk Level</CardTitle>
            <div className={`text-3xl font-black ${riskTextColor} mt-2`}>
              {data?.risk}
            </div>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <div className="h-32 w-32 mx-auto rounded-full border-4 border-muted flex flex-col items-center justify-center relative mb-4">
              <span className="text-2xl font-bold">{((data?.confidence || 0) * 100).toFixed(0)}%</span>
              <span className="text-[10px] text-muted-foreground font-medium">CONFIDENCE</span>
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="64" cy="64" r="60" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  strokeDasharray={377}
                  strokeDashoffset={377 - (377 * (data?.confidence || 0))}
                  className="text-primary"
                />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground italic">Ensemble model evaluation</p>
          </CardContent>
          <div className={`h-2 w-full ${riskColor}`}></div>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assessment Summary</CardTitle>
            <CardDescription>Key data points from your recent health check</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                <UserCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Demographics</p>
                  <p className="text-sm font-bold">{data?.age} Years, {data?.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Lump Found</p>
                  <p className="text-sm font-bold uppercase">{data?.breastLump}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Family Hist.</p>
                  <p className="text-sm font-bold uppercase">{data?.familyHistory}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                <AlertTriangle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Lifestyle</p>
                  <p className="text-sm font-bold">Smoking: {data?.smoking?.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="explanation" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-white border">
          <TabsTrigger value="explanation" className="data-[state=active]:bg-primary data-[state=active]:text-white">AI Explanation</TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-primary data-[state=active]:text-white">Recommendations</TabsTrigger>
          <TabsTrigger value="factors" className="data-[state=active]:bg-primary data-[state=active]:text-white">Contributing Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="explanation" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle>What does this mean?</CardTitle>
                <CardDescription>Generative AI analysis of your risk profile</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="prose max-w-none text-slate-700 leading-relaxed">
              {aiResult?.explanation || "Explanation not available at this time."}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg">Suggested Precautions</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700">
                {aiResult?.precautions || "Precautions loading..."}
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="text-lg">Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700">
                {aiResult?.nextSteps || "Next steps loading..."}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why this result?</CardTitle>
              <CardDescription>Top factors contributing to the machine learning prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { factor: 'Breast Lump Presence', importance: data?.breastLump === 'yes' ? 0.9 : 0.1 },
                { factor: 'Family History', importance: data?.familyHistory === 'yes' ? 0.8 : 0.2 },
                { factor: 'Age Factor', importance: (parseInt(data?.age) || 0) > 50 ? 0.7 : 0.3 },
                { factor: 'Symptom Multiplier', importance: data?.bloating === 'yes' ? 0.5 : 0.2 },
              ].sort((a, b) => b.importance - a.importance).map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.factor}</span>
                    <span className="text-muted-foreground">{(item.importance * 100).toFixed(0)}% impact</span>
                  </div>
                  <Progress value={item.importance * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <Button size="lg" variant="secondary" onClick={() => router.push('/assessment')} className="rounded-xl">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry Assessment
        </Button>
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin" /></div>}>
      <ResultsContent />
    </Suspense>
  );
}
