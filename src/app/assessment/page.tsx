
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Loader2, ShieldAlert } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STEPS = [
  { id: 1, title: 'Personal Info', description: 'Basic demographics' },
  { id: 2, title: 'Symptoms', description: 'Physical observations' },
  { id: 3, title: 'History', description: 'Family health record' },
  { id: 4, title: 'Lifestyle', description: 'Daily habits' },
];

export default function Assessment() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'female',
    breastLump: 'no',
    pain: 'no',
    irregularPeriods: 'no',
    bloating: 'no',
    familyHistory: 'no',
    smoking: 'no',
    alcohol: 'no',
  });

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = async () => {
    setLoading(true);
    // Simulate ML API call and data processing
    try {
      // Create summary strings for Gemini explanation later
      const assessmentData = {
        id: Math.random().toString(36).substring(7),
        ...formData,
        date: new Date().toLocaleDateString(),
        // Mocked ML prediction logic
        risk: calculateMockRisk(formData),
        confidence: 0.75 + (Math.random() * 0.2), // Random 75% - 95%
      };

      // Save to local storage (simulating Firestore)
      const existing = JSON.parse(localStorage.getItem('onco_assessments') || '[]');
      localStorage.setItem('onco_assessments', JSON.stringify([assessmentData, ...existing]));
      localStorage.setItem('last_assessment', JSON.stringify(assessmentData));

      // Redirect to results
      router.push(`/results?id=${assessmentData.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const calculateMockRisk = (data: any) => {
    let score = 0;
    if (parseInt(data.age) > 50) score += 2;
    if (data.breastLump === 'yes') score += 5;
    if (data.familyHistory === 'yes') score += 4;
    if (data.smoking === 'yes') score += 1;
    if (data.bloating === 'yes') score += 2;

    if (score >= 7) return 'High';
    if (score >= 4) return 'Medium';
    return 'Low';
  };

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-headline mb-2 text-primary">Risk Assessment</h1>
        <p className="text-muted-foreground">Please provide accurate information for the best AI-driven prediction.</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2 px-1">
          <span className="text-sm font-medium text-primary">Step {currentStep} of {STEPS.length}</span>
          <span className="text-sm font-medium text-muted-foreground">{STEPS[currentStep - 1].title}</span>
        </div>
        <Progress value={progress} className="h-2 bg-secondary" />
      </div>

      <Card className="shadow-xl border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-xl">{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col justify-center">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter your age" 
                  value={formData.age} 
                  onChange={(e) => updateFormData('age', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Biological Gender</Label>
                <Select value={formData.gender} onValueChange={(v) => updateFormData('gender', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {[
                { label: 'Do you feel a breast lump?', key: 'breastLump' },
                { label: 'Are you experiencing localized pain?', key: 'pain' },
                { label: 'Irregular periods or post-menopausal bleeding?', key: 'irregularPeriods' },
                { label: 'Frequent abdominal bloating?', key: 'bloating' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-lg border">
                  <Label className="text-base">{item.label}</Label>
                  <RadioGroup 
                    value={formData[item.key as keyof typeof formData]} 
                    onValueChange={(v) => updateFormData(item.key, v)} 
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${item.key}-yes`} />
                      <Label htmlFor={`${item.key}-yes`}>Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${item.key}-no`} />
                      <Label htmlFor={`${item.key}-no`}>No</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-secondary/30 flex items-start gap-4">
                <ShieldAlert className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="space-y-4">
                  <Label className="text-lg font-semibold block">Family Cancer History</Label>
                  <p className="text-sm text-muted-foreground mb-4">Have any of your first-degree relatives (parents, siblings, children) had breast or ovarian cancer?</p>
                  <RadioGroup 
                    value={formData.familyHistory} 
                    onValueChange={(v) => updateFormData('familyHistory', v)}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-md bg-white border">
                      <RadioGroupItem value="yes" id="fam-yes" />
                      <Label htmlFor="fam-yes" className="flex-1 cursor-pointer">Yes, there is history</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-md bg-white border">
                      <RadioGroupItem value="no" id="fam-no" />
                      <Label htmlFor="fam-no" className="flex-1 cursor-pointer">No history reported</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base">Smoking Status</Label>
                <RadioGroup 
                  value={formData.smoking} 
                  onValueChange={(v) => updateFormData('smoking', v)} 
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border p-3 rounded-lg">
                    <RadioGroupItem value="yes" id="smoke-yes" />
                    <Label htmlFor="smoke-yes">Yes / Occasional</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-lg">
                    <RadioGroupItem value="no" id="smoke-no" />
                    <Label htmlFor="smoke-no">Non-smoker</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-base">Alcohol Consumption</Label>
                <RadioGroup 
                  value={formData.alcohol} 
                  onValueChange={(v) => updateFormData('alcohol', v)} 
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border p-3 rounded-lg">
                    <RadioGroupItem value="yes" id="alc-yes" />
                    <Label htmlFor="alc-yes">Regular / Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-lg">
                    <RadioGroupItem value="no" id="alc-no" />
                    <Label htmlFor="alc-no">Never / Rare</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1 || loading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            className="min-w-[120px] bg-primary" 
            onClick={handleNext} 
            disabled={loading || (currentStep === 1 && !formData.age)}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : currentStep === STEPS.length ? (
              'Get Results'
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
