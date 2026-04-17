
import React, { useState, useRef } from 'react';
import { CVData, TemplateId } from './types';
import { CVEditor } from './components/CVEditor';
import { ModernTemplate, ClassicTemplate, MinimalistTemplate } from './components/CVTemplates';
import { AIHelper } from './components/AIHelper';
import { Button } from '@/components/ui-lib/button';
import { 
  Download, 
  Settings, 
  Send, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Briefcase,
  Monitor,
  Search,
  FileUp,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui-lib/dialog";
import { Card } from '@/components/ui-lib/card';
import { Input } from '@/components/ui-lib/input';
import { Label } from '@/components/ui-lib/label';
import { Textarea } from '@/components/ui-lib/textarea';
import { ScrollArea } from '@/components/ui-lib/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-lib/select';

import { exportToDocx } from './lib/docxExport';
import { handleFileImport } from './lib/importHandlers';
import { CVAIProvider } from './lib/cvAi';

const INITIAL_DATA: CVData = {
  personalInfo: {
    fullName: 'Mario Rossi',
    email: 'mario.rossi@email.it',
    phone: '+39 123 456 789',
    location: 'Milano, Italia',
    website: 'linkedin.com/in/mariorossi',
    jobTitle: 'Senior Software Engineer',
    summary: 'Sviluppatore software con oltre 10 anni di esperienza nella progettazione di architetture scalabili. Specializzato in React, Node.js e Cloud Computing. Appassionato di problem solving e mentorship.'
  },
  experiences: [
    {
      id: '1',
      company: 'Tech Solutions SpA',
      position: 'Lead Developer',
      startDate: 'Gen 2020',
      endDate: 'Presente',
      description: 'Responsabile del team frontend. Implementazione di micro-frontend e migrazione a AWS. Riduzione del debito tecnico del 30%.'
    },
    {
      id: '2',
      company: 'Web Agency XYZ',
      position: 'Full Stack Developer',
      startDate: 'Mar 2015',
      endDate: 'Dic 2019',
      description: 'Sviluppo di portali e-commerce e integrazione API di terze parti (Stripe, PayPal, Google Maps).'
    }
  ],
  educations: [
    {
      id: 'e1',
      school: 'Politecnico di Milano',
      degree: 'Laurea Magistrale in Ingegneria Informatica',
      startDate: '2010',
      endDate: '2015',
      description: 'Tesi sperimentale su Intelligenza Artificiale applicata al Web.'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Scrum'],
  projects: [
    { id: 'p1', name: 'OpenSource CRM', description: 'Un CRM leggero costruito con Next.js e Prisma.', link: 'github.com/mario/crm' }
  ],
  languages: [
    { name: 'Italiano', level: 'Madrelingua' },
    { name: 'Inglese', level: 'C1 - Advanced' }
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023' }
  ],
  interests: ['Intelligenza Artificiale', 'Open Source', 'Viaggi', 'Fotografia']
};

export default function App() {
  const [cvData, setCvData] = useState<CVData>(INITIAL_DATA);
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [isExporting, setIsExporting] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExporting(true); // Reuse isExporting for global loader
    try {
      const text = await handleFileImport(file);
      const parsedData = await CVAIProvider.parseCVFromText(text);
      setCvData(parsedData);
    } catch (error) {
      console.error('Errore durante l\'importazione:', error);
      alert('Errore durante l\'importazione del file. Assicurati che il file sia leggibile.');
    } finally {
      setIsExporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const exportPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('cv-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error('Error generating PDF', e);
    }
    setIsExporting(false);
  };

  const handleAIAction = (newText: string) => {
    setCvData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, summary: newText }
    });
  };

  const translateToEN = async () => {
    setIsExporting(true);
    try {
      const translated = await CVAIProvider.translateCV(cvData.personalInfo.summary, 'English');
      handleAIAction(translated);
    } catch (e) {
      console.error(e);
    }
    setIsExporting(false);
  };

  const renderTemplate = () => {
    const props = { data: cvData };
    switch (template) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'classic': return <ClassicTemplate {...props} />;
      case 'minimalist': return <MinimalistTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight leading-none text-primary flex items-center gap-2">
              <span className="text-xl">📄</span> ResuMaster AI
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            accept=".pdf,.docx,.txt,image/*" 
            className="hidden" 
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleImportClick} 
            disabled={isExporting} 
            className="bg-primary/5 border-primary/20 hover:bg-primary/10"
          >
             {isExporting ? <Loader2 className="mr-2 animate-spin" size={14} /> : <FileUp className="mr-2" size={14} />}
             {isExporting ? 'Analisi AI...' : 'Importa CV'}
          </Button>
          <Button variant="outline" size="sm" onClick={translateToEN} disabled={isExporting}>
             Traduci (EN)
          </Button>
          <Button variant="outline" size="sm" onClick={exportPDF} disabled={isExporting}>
             {isExporting ? '...' : 'PDF'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToDocx(cvData)}>
             Word
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToDocx(cvData)} title="Esporta in formato compatibile con Pages">
             Pages
          </Button>

          <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
            <DialogTrigger render={<Button size="sm" className="bg-primary hover:bg-primary/90" />}>
              <Send size={16} className="mr-2" /> Invia Candidatura
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invia il tuo CV</DialogTitle>
                <DialogDescription>
                  Invia direttamente la tua candidatura per un'offerta di lavoro.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Email Destinatario</Label>
                  <Input placeholder="hr@azienda.com" />
                </div>
                <div className="space-y-2">
                  <Label>Oggetto</Label>
                  <Input defaultValue={`Candidatura per Posizione - ${cvData.personalInfo.fullName}`} />
                </div>
                <div className="space-y-2">
                  <Label>Messaggio di accompagnamento</Label>
                  <Textarea placeholder="Buongiorno..." className="h-32" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  alert("Simulazione: CV inviato con successo!");
                  setShowApplyDialog(false);
                }}>Invia Ora</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content: Bento Grid */}
      <main className="flex-1 grid grid-cols-[280px_1fr_300px] gap-4 p-4 overflow-hidden">
        
        {/* Left Column: Sections & Templates */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="flex flex-col overflow-hidden shrink-0 h-[60%]">
            <div className="p-4 flex flex-col h-full overflow-hidden">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4">Sezioni Curriculum</div>
              <ScrollArea className="flex-1 -mr-2 pr-2">
                <CVEditor data={cvData} onChange={setCvData} />
              </ScrollArea>
            </div>
          </Card>

          <Card className="flex flex-col flex-1">
            <div className="p-4 flex flex-col h-full">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4">Template Professionali</div>
              <div className="grid grid-cols-2 gap-3">
                {(['modern', 'classic', 'minimalist'] as TemplateId[]).map((t) => (
                  <button 
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`aspect-[1/1.4] bg-muted rounded-md border-2 transition-all hover:scale-105 ${template === t ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-bold uppercase text-muted-foreground">
                      {t}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Center: Preview Section */}
        <section className="bg-slate-400 rounded-xl p-8 overflow-auto flex justify-center items-start shadow-inner">
          <div className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] origin-top transform scale-[0.6] min-[1400px]:scale-[0.8] 2xl:scale-100 transition-transform">
             {renderTemplate()}
          </div>
        </section>

        {/* Right Column: AI & Stats */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <AIHelper cvText={JSON.stringify(cvData)} onTextAction={handleAIAction} />

          <Card className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 flex flex-col h-full overflow-hidden">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4">Offerte di Lavoro</div>
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  {[
                    { title: 'Senior Developer', company: 'Google', loc: 'Milano', time: '2h fa' },
                    { title: 'Project Manager', company: 'Amazon', loc: 'Roma', time: 'Ieri' },
                    { title: 'UX Designer', company: 'Startup Inc', loc: 'Remoto', time: '3gg fa' },
                    { title: 'Frontend Engineer', company: 'Tech Hub', loc: 'Torino', time: '1 sett fa' },
                  ].map((job, i) => (
                    <div key={i} className="pb-3 border-b border-border last:border-0 hover:bg-muted/50 p-1 rounded-sm cursor-pointer transition-colors">
                      <div className="text-sm font-bold">{job.title}</div>
                      <div className="text-xs text-muted-foreground">{job.company} • {job.loc} • {job.time}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button size="sm" className="mt-4 w-full text-xs font-bold uppercase tracking-wider" onClick={() => setShowApplyDialog(true)}>
                Invia Candidatura Rapida
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Mini Status Bar */}
      <div className="h-6 bg-slate-900 text-white text-[9px] flex items-center justify-between px-4 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Monitor size={10} /> Live Preview</span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-emerald-400">● AI Assistant Ready</span>
        </div>
        <div className="flex items-center gap-2">
          Sync Status: <span className="text-emerald-400">Up to date</span>
        </div>
      </div>
    </div>
  );
}
