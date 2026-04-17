
import React, { useState, useRef, useEffect } from 'react';
import { CVData, TemplateId, DocumentFile, BottomImage } from './types';
import { CVEditor } from './components/CVEditor';
import { ModernTemplate, ClassicTemplate, MinimalistTemplate, ZenoneTemplate } from './components/CVTemplates';
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
  Loader2,
  History,
  FilePlus,
  Archive,
  Copy,
  Edit2,
  Trash2,
  Image as ImageIcon
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
import { Card, CardContent } from '@/components/ui-lib/card';
import { Input } from '@/components/ui-lib/input';
import { Label } from '@/components/ui-lib/label';
import { Textarea } from '@/components/ui-lib/textarea';
import { ScrollArea } from '@/components/ui-lib/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui-lib/select';

import { exportToDocx } from './lib/docxExport';
import { handleFileImport } from './lib/importHandlers';
import { CVAIProvider } from './lib/cvAi';

const EMPTY_DATA: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    jobTitle: '',
    summary: ''
  },
  experiences: [],
  educations: [],
  publications: [],
  customSections: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  interests: []
};

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
  publications: [],
  customSections: [],
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

export interface DocumentRecord {
  id: string;
  filename: string;
  date: string;
  cvSnapshot: CVData;
}

export default function App() {
  const [activeView, setActiveView] = useState<'editor' | 'archive'>('editor');
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  const [cvData, setCvData] = useState<CVData>(INITIAL_DATA);
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [bottomImage, setBottomImage] = useState<BottomImage | undefined>(undefined);
  const [docTitle, setDocTitle] = useState<string>('Senza titolo');

  const [isExporting, setIsExporting] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [documentHistory, setDocumentHistory] = useState<DocumentRecord[]>([]); // Optional per-session history
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  // Load documents on mount
  useEffect(() => {
    const saved = localStorage.getItem('resuMaster_docs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDocuments(parsed);
        if (parsed.length > 0 && !currentDocId) {
          openDocument(parsed[0].id, parsed);
        }
      } catch (e) {
        console.error("Error loading docs", e);
      }
    }
  }, []);

  // Save changes automatically
  useEffect(() => {
    if (activeView === 'editor' && currentDocId) {
       setDocuments(prev => {
         const updated = prev.map(doc => {
           if(doc.id === currentDocId) {
             return {
               ...doc,
               title: docTitle,
               cvData,
               template,
               bottomImage,
               updatedAt: new Date().toISOString()
             }
           }
           return doc;
         });
         localStorage.setItem('resuMaster_docs', JSON.stringify(updated));
         return updated;
       });
    }
  }, [cvData, template, bottomImage, docTitle, currentDocId, activeView]);

  const openDocument = (id: string, docsList = documents) => {
    const doc = docsList.find(d => d.id === id);
    if (doc) {
      setCurrentDocId(doc.id);
      setCvData(doc.cvData);
      setTemplate(doc.template || 'modern');
      setBottomImage(doc.bottomImage);
      setDocTitle(doc.title);
      setDocumentHistory([]); // Clear session history
      setActiveView('editor');
    }
  };

  const handleNewCV = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newDoc: DocumentFile = {
      id: newId,
      title: 'Nuovo file',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      cvData: EMPTY_DATA,
      template: 'modern'
    };
    
    setDocuments(prev => {
      const updated = [newDoc, ...prev];
      localStorage.setItem('resuMaster_docs', JSON.stringify(updated));
      return updated;
    });

    openDocument(newId, [newDoc, ...documents]);
  };

  const deleteDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(window.confirm('Sei sicuro di voler eliminare questo documento definitivo?')) {
      setDocuments(prev => {
        const updated = prev.filter(d => d.id !== id);
        localStorage.setItem('resuMaster_docs', JSON.stringify(updated));
        if (currentDocId === id) {
          if (updated.length > 0) openDocument(updated[0].id, updated);
          else {
             setCurrentDocId(null);
             setActiveView('archive');
          }
        }
        return updated;
      });
    }
  };

  const duplicateDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const docToCopy = documents.find(d => d.id === id);
    if (!docToCopy) return;

    const newId = Math.random().toString(36).substr(2, 9);
    const newDoc: DocumentFile = {
      ...docToCopy,
      id: newId,
      title: docToCopy.title + ' (Copia)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDocuments(prev => {
      const updated = [newDoc, ...prev];
      localStorage.setItem('resuMaster_docs', JSON.stringify(updated));
      return updated;
    });
  };

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBottomImage({ url: event.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
    if (imgInputRef.current) imgInputRef.current.value = '';
  };

  const removeBottomImage = () => {
    setBottomImage(undefined);
  };

  const handleImportClick = () => {
    if (!currentDocId) {
      alert("Crea o apri prima un documento per poter importare dati.");
      return;
    }
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExporting(true); // Reuse isExporting for global loader
    try {
      const text = await handleFileImport(file);
      const isMerge = cvData !== INITIAL_DATA; 
      const parsedData = await CVAIProvider.parseCVFromText(text, isMerge ? cvData : undefined);
      setCvData(parsedData);
      
      const newRecord: DocumentRecord = {
        id: Math.random().toString(),
        filename: file.name,
        date: new Date().toLocaleString(),
        cvSnapshot: parsedData
      };
      setDocumentHistory(prev => [newRecord, ...prev]);

    } catch (error: any) {
      console.error('Errore durante l\'importazione:', error);
      alert('Errore durante l\'importazione: ' + (error?.message || error));
    } finally {
      setIsExporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const restoreHistoryVersion = (record: DocumentRecord) => {
    if (window.confirm(`Vuoi ripristinare il Curriculum allo stato di importazione del file "${record.filename}"?`)) {
      setCvData(record.cvSnapshot);
      setShowHistoryDialog(false);
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
    const props = { data: cvData, bottomImage };
    switch (template) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'classic': return <ClassicTemplate {...props} />;
      case 'minimalist': return <MinimalistTemplate {...props} />;
      case 'zenone': return <ZenoneTemplate {...props} />;
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
            <div className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground mt-1">
              Realizzata da: <a href="https://www.zenone.it" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline">www.zenone.it</a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            accept=".pdf,.docx,.txt,image/*" 
            className="hidden" 
          />
          
          <Button variant="ghost" size="sm" onClick={() => setActiveView('archive')} className={activeView === 'archive' ? 'bg-muted' : 'text-muted-foreground hover:text-foreground'}>
             <Archive size={14} className="mr-1.5" />
             Archivio
          </Button>

          <Button variant="ghost" size="sm" onClick={handleNewCV} className="text-muted-foreground hover:text-foreground">
             <FilePlus size={14} className="mr-1.5" />
             Nuovo
          </Button>

          <div className="h-4 w-px bg-border mx-1"></div>

          {activeView === 'editor' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleImportClick} 
                disabled={isExporting} 
                className="bg-primary/5 border-primary/20 hover:bg-primary/10"
                title="Importa un PDF/Word per generarlo o aggiornare quello attuale"
              >
                 {isExporting ? <Loader2 className="mr-2 animate-spin" size={14} /> : <FileUp className="mr-2" size={14} />}
                 {isExporting ? 'Analisi AI...' : 'Importa Doc'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowHistoryDialog(true)} 
                 disabled={documentHistory.length === 0}
                className="relative"
                title="Cronologia documenti importati"
              >
                 <History size={14} className="mr-1.5" />
                 Versioni
                 {documentHistory.length > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                     {documentHistory.length}
                   </span>
                 )}
              </Button>

              <div className="h-4 w-px bg-border mx-1"></div>

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
            </>
          )}

          {/* History Dialog */}
          <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Cronologia Versioni
                </DialogTitle>
                <DialogDescription>
                  Qui puoi vedere la cronologia dei documenti importati. Il sistema unisce le informazioni in automatico, ma puoi ripristinare il Curriculum allo stato di una vecchia importazione.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {documentHistory.map((record, index) => (
                  <div key={record.id} className="p-3 border rounded-lg bg-muted/30 relative group">
                     {index === 0 && <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">Attuale</span>}
                     <div className="font-semibold text-sm truncate pr-16" title={record.filename}>
                       📄 {record.filename}
                     </div>
                     <div className="text-xs text-muted-foreground mt-1">
                       Importato il: {record.date}
                     </div>
                     <div className="mt-3">
                       <Button 
                         variant={index === 0 ? "outline" : "default"} 
                         size="sm" 
                         className="w-full text-xs h-7"
                         onClick={() => restoreHistoryVersion(record)}
                         disabled={index === 0}
                       >
                         {index === 0 ? "Stato Corrente" : "Ripristina a questa versione"}
                       </Button>
                     </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

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

      {/* Main Content */}
      {activeView === 'archive' ? (
        <main className="flex-1 overflow-auto p-12 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Archivio Documenti</h2>
            {documents.length === 0 ? (
              <div className="text-center text-muted-foreground py-20 bg-white rounded-xl border border-dashed">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p>Nessun documento in archivio.</p>
                <Button onClick={handleNewCV} className="mt-4">
                  <FilePlus className="mr-2" size={16} /> Crea il tuo primo CV
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {documents.map(doc => (
                  <Card key={doc.id} className="group hover:border-primary/50 transition-colors cursor-pointer" onClick={() => openDocument(doc.id)}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <FileText size={24} />
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={(e) => duplicateDocument(doc.id, e)} title="Duplica">
                            <Copy size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => deleteDocument(doc.id, e)} title="Elimina">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-1 truncate">{doc.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4 truncate">{doc.cvData.personalInfo.fullName || 'Utente'}</p>
                      <div className="flex justify-between text-[10px] text-muted-foreground/80 font-mono">
                         <span>Mod: {new Date(doc.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="flex-1 grid grid-cols-[280px_1fr_300px] gap-4 p-4 overflow-hidden">
          
          {/* Left Column: Sections & Templates */}
          <div className="flex flex-col gap-4 overflow-hidden">
            <Card className="flex flex-col shrink-0">
               <div className="p-4 flex flex-col gap-3">
                 <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Info Documento</div>
                 <Input 
                   value={docTitle} 
                   onChange={(e) => setDocTitle(e.target.value)} 
                   placeholder="Nome del CV nell'archivio..." 
                   className="h-8 text-sm font-semibold border-primary/20 bg-primary/5" 
                 />
                 
                 <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-2">Immagine Piè di Pagina (Firma/Logo)</div>
                 {bottomImage ? (
                   <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                     <div className="flex items-center gap-2">
                       <img src={bottomImage.url} alt="firma" className="h-8 w-8 object-contain bg-white rounded" />
                       <span className="text-[10px] truncate max-w-[100px]">Immagine caricata</span>
                     </div>
                     <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={removeBottomImage}>
                       <Trash2 size={12} />
                     </Button>
                   </div>
                 ) : (
                   <div>
                     <input type="file" accept="image/*" className="hidden" ref={imgInputRef} onChange={onImageUpload} />
                     <Button variant="outline" size="sm" className="w-full text-xs h-8 border-dashed" onClick={() => imgInputRef.current?.click()}>
                       <ImageIcon size={14} className="mr-2" /> Aggiungi Firma o Logo
                     </Button>
                   </div>
                 )}
               </div>
            </Card>

            <Card className="flex flex-col overflow-hidden flex-1">
              <div className="p-4 flex flex-col h-full overflow-hidden">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4 shrink-0">Sezioni Curriculum</div>
                <div className="flex-1 overflow-y-auto -mr-2 pr-2 pb-4 scroll-smooth">
                  <CVEditor data={cvData} onChange={setCvData} />
                </div>
              </div>
            </Card>

            <Card className="flex flex-col shrink-0">
              <div className="p-4 flex flex-col">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Template Professionali</div>
                <div className="grid grid-cols-4 gap-2">
                  {(['modern', 'classic', 'minimalist', 'zenone'] as TemplateId[]).map((t) => (
                    <button 
                      key={t}
                      onClick={() => setTemplate(t)}
                      title={t === 'zenone' ? 'Stile allegato: Design Zenone.it' : undefined}
                      className={`aspect-[1/1.2] bg-muted rounded-md border-2 transition-all hover:scale-105 ${template === t ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center text-[8px] font-bold uppercase text-muted-foreground">
                        <span className="text-[16px] mb-1">
                          {t==='modern' ? '✨' : t==='classic' ? '🏛️' : t==='minimalist' ? '⚪' : '🟢'}
                        </span>
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
      )}

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
