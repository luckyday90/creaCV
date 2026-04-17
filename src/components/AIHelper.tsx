import React, { useState } from 'react';
import { CVAIProvider } from '../lib/cvAi';
import { Button } from '@/components/ui-lib/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui-lib/card';
import { Sparkles, Languages, CheckCircle2, Search, Wand2, Loader2, Quote } from 'lucide-react';
import { Badge } from '@/components/ui-lib/badge';

interface AIHelperProps {
  cvText: string;
  onTextAction: (text: string) => void;
}

export const AIHelper: React.FC<AIHelperProps> = ({ cvText, onTextAction }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);

  const handleRewrite = async () => {
    setLoading('rewriting');
    try {
      const result = await CVAIProvider.rewriteText(cvText);
      onTextAction(result || cvText);
    } catch (e) {
      console.error(e);
    }
    setLoading(null);
  };

  const handleCheck = async () => {
    setLoading('checking');
    try {
      const result = await CVAIProvider.checkFormattingAndKeywords(cvText);
      setFeedback(result);
    } catch (e) {
      console.error(e);
    }
    setLoading(null);
  };

  return (
    <Card className="border-border bg-card shadow-sm">
      <div className="p-4 space-y-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
          Qualità & ATS
          <Sparkles size={12} className="text-primary" />
        </div>

        {feedback ? (
          <div className="flex flex-col items-center py-2 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-3">
              <span className="text-xl font-bold">{feedback.overallScore}%</span>
            </div>
            <p className="text-[10px] text-center text-muted-foreground leading-tight px-4 mb-4">
              {feedback.formattingFeedback}
            </p>
            <div className="flex flex-wrap gap-1 justify-center mb-4">
              {feedback.suggestedKeywords?.slice(0, 4).map((kw: string) => (
                <Badge key={kw} variant="secondary" className="text-[9px] px-1.5 py-0 bg-muted border-border">{kw}</Badge>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="bg-primary/5 border-l-4 border-primary p-3 rounded-r-md">
              <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tight">Copywriting AI 🪄</div>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Analizza il tuo CV per migliorare il copywriting e il punteggio ATS.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-[10px] h-8 font-bold uppercase tracking-wider"
            onClick={handleRewrite}
            disabled={!!loading}
          >
            {loading === 'rewriting' ? <Loader2 className="animate-spin mr-2" size={12} /> : <Wand2 size={12} className="mr-2" />}
            Migliora Copywriting
          </Button>
          <Button 
            className="text-[10px] h-8 font-bold uppercase tracking-wider bg-primary"
            onClick={handleCheck}
            disabled={!!loading}
          >
            {loading === 'checking' ? <Loader2 className="animate-spin mr-2" size={12} /> : <Search size={12} className="mr-2" />}
            Controlla Qualità
          </Button>
        </div>
      </div>
    </Card>
  );
};
