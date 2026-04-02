
import { AlertCircle } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-primary/5 border-t border-primary/10 py-3 px-4">
      <div className="container mx-auto max-w-6xl flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground text-center">
        <AlertCircle className="h-4 w-4 text-primary shrink-0" />
        <p>
          <strong>Medical Disclaimer:</strong> This app is for educational purposes only and not a medical diagnosis. Please consult a healthcare professional for personalized medical advice.
        </p>
      </div>
    </div>
  );
}
