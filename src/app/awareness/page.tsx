
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, CheckCircle2, ShieldPlus, Heart, Apple, Dumbbell, AlertTriangle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Awareness() {
  const awarenessImg = PlaceHolderImages.find(img => img.id === 'awareness-ribbon');

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold font-headline text-primary">Awareness Center</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Knowledge is your first line of defense. Explore guides, symptoms, and prevention strategies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2 space-y-12">
          {/* Guide Section */}
          <section>
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 text-primary" />
              Breast Self-Exam Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Look in Mirror", text: "Check with arms at sides, then with arms raised, looking for changes in shape or skin." },
                { title: "Check While Standing", text: "Use your finger pads to feel the breast in a circular pattern from outside to inside." },
                { title: "Check While Lying Down", text: "Place a pillow under your shoulder and use firm, smooth touch for exploration." },
                { title: "Squeeze Nipples", text: "Gently check for any discharge or abnormal sensitivity." }
              ].map((step, i) => (
                <div key={i} className="p-5 rounded-2xl border bg-white shadow-sm flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">{i+1}</div>
                  <div>
                    <h4 className="font-bold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Symptoms Checklist */}
          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-3">
              <AlertTriangle className="h-7 w-7 text-yellow-500" />
              Symptoms Checklist
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="breast">
                <AccordionTrigger className="text-lg font-semibold">Breast Cancer Warning Signs</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>New lump in the breast or underarm (armpit).</li>
                    <li>Thickening or swelling of part of the breast.</li>
                    <li>Irritation or dimpling of breast skin.</li>
                    <li>Redness or flaky skin in the nipple area or the breast.</li>
                    <li>Pulling in of the nipple or pain in the nipple area.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ovarian">
                <AccordionTrigger className="text-lg font-semibold">Ovarian Cancer Warning Signs</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Bloating that is persistent.</li>
                    <li>Difficulty eating or feeling full quickly.</li>
                    <li>Urinary symptoms (urgency or frequency).</li>
                    <li>Pelvic or abdominal pain.</li>
                    <li>Extreme tiredness (fatigue) or back pain.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <Card className="bg-primary text-white border-none shadow-xl overflow-hidden">
            <div className="relative h-40 w-full">
              {awarenessImg && (
                <Image 
                  src={awarenessImg.imageUrl} 
                  alt="Awareness" 
                  fill 
                  className="object-cover opacity-30" 
                  data-ai-hint={awarenessImg.imageHint}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="h-16 w-16 text-white" />
              </div>
            </div>
            <CardHeader>
              <CardTitle>Prevention Tips</CardTitle>
              <CardDescription className="text-primary-foreground/70">Small lifestyle changes can make a big difference.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Apple className="h-6 w-6 shrink-0" />
                <p className="text-sm">Maintain a healthy diet rich in fruits and vegetables.</p>
              </div>
              <div className="flex gap-4">
                <Dumbbell className="h-6 w-6 shrink-0" />
                <p className="text-sm">Regular physical activity (at least 30 mins a day).</p>
              </div>
              <div className="flex gap-4">
                <ShieldPlus className="h-6 w-6 shrink-0" />
                <p className="text-sm">Limit alcohol and avoid tobacco products.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recommended Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "The Genetic Link in Cancers",
                "Understanding Your Mammogram",
                "Nutrition and Breast Health",
                "Early Detection Statistics"
              ].map((link, i) => (
                <div key={i} className="text-sm font-medium hover:text-primary cursor-pointer border-b pb-2 last:border-0">
                  {link}
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
