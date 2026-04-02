
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, HeartPulse, BrainCircuit, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-medical');
  const checkupImage = PlaceHolderImages.find(img => img.id === 'self-exam');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-secondary text-primary border-primary/10">
              <HeartPulse className="mr-2 h-4 w-4" />
              Empowering Health Through Technology
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Early Detection <br />
              <span className="text-primary">Saves Lives</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
              OncoGuard AI uses advanced machine learning and generative AI to assess risk factors for breast and ovarian cancer, providing actionable health insights in simple language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" className="bg-primary text-white h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-primary/20 transition-all group" asChild>
                <Link href="/assessment">
                  Start Risk Assessment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-2" asChild>
                <Link href="/awareness">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description} 
                fill 
                className="object-cover" 
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 font-headline">Why OncoGuard AI?</h2>
            <p className="text-muted-foreground">We combine clinical data markers with state-of-the-art AI to give you a comprehensive understanding of your risk factors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="h-10 w-10 text-primary" />}
              title="Secure Assessment"
              description="Your data is handled with strict privacy controls and stored securely in Firestore."
            />
            <FeatureCard 
              icon={<BrainCircuit className="h-10 w-10 text-accent" />}
              title="AI-Driven Insights"
              description="Our ensemble ML models predict risk levels with confidence scores based on your inputs."
            />
            <FeatureCard 
              icon={<Activity className="h-10 w-10 text-primary" />}
              title="Clear Explanations"
              description="Powered by Gemini, we translate complex medical factors into simple, actionable steps."
            />
          </div>
        </div>
      </section>

      {/* Awareness Promo */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 order-2 md:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              {checkupImage && (
                <Image 
                  src={checkupImage.imageUrl} 
                  alt={checkupImage.description} 
                  fill 
                  className="object-cover"
                  data-ai-hint={checkupImage.imageHint}
                />
              )}
            </div>
          </div>
          <div className="flex-1 space-y-8 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Prevention & Awareness</h2>
            <p className="text-lg text-muted-foreground">
              Understanding the signs is the first step toward a healthy future. Our awareness module provides guides for self-exams and symptoms checklists.
            </p>
            <ul className="space-y-4">
              {[
                "Comprehensive Breast Self-Exam Guide",
                "Ovarian Cancer Symptom Checklist",
                "Lifestyle & Prevention Tips",
                "Screening Schedule Recommendations"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/5" asChild>
              <Link href="/awareness">View Awareness Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3 font-headline">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
