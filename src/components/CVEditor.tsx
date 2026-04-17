import React from 'react';
import { CVData } from '../types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({ data, onChange }) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experiences: [
        ...data.experiences,
        { id: Math.random().toString(), company: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experiences: data.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      educations: [
        ...data.educations,
        { id: Math.random().toString(), school: '', degree: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      educations: data.educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const addCertification = () => {
    onChange({
      ...data,
      certifications: [
        ...data.certifications,
        { id: Math.random().toString(), name: '', issuer: '', date: '' }
      ]
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map(cert => cert.id === id ? { ...cert, [field]: value } : cert)
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id)
    });
  };

  const addInterest = (interest: string) => {
    if (!interest.trim()) return;
    onChange({ ...data, interests: [...data.interests, interest] });
  };

  const removeInterest = (index: number) => {
    onChange({ ...data, interests: data.interests.filter((_, i) => i !== index) });
  };

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [...data.languages, { name: '', level: 'B1 - Intermedio' }]
    });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLangs = [...data.languages];
    newLangs[index] = { ...newLangs[index], [field]: value };
    onChange({ ...data, languages: newLangs });
  };

  const removeLanguage = (index: number) => {
    onChange({ ...data, languages: data.languages.filter((_, i) => i !== index) });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [...data.projects, { id: Math.random().toString(), name: '', description: '', link: '' }]
    });
  };

  const updateProject = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    onChange({ ...data, skills: [...data.skills, skill] });
  };

  const removeSkill = (index: number) => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">👤 Anagrafica</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Input 
            className="h-8 text-xs bg-muted/30" 
            value={data.personalInfo.fullName} 
            onChange={e => updatePersonalInfo('fullName', e.target.value)} 
            placeholder="Nome Completo" 
          />
          <Input 
            className="h-8 text-xs bg-muted/30" 
            value={data.personalInfo.jobTitle} 
            onChange={e => updatePersonalInfo('jobTitle', e.target.value)} 
            placeholder="Professione" 
          />
          <div className="grid grid-cols-2 gap-2">
            <Input 
              className="h-8 text-xs bg-muted/30" 
              value={data.personalInfo.email} 
              onChange={e => updatePersonalInfo('email', e.target.value)} 
              placeholder="Email" 
            />
            <Input 
              className="h-8 text-xs bg-muted/30" 
              value={data.personalInfo.phone} 
              onChange={e => updatePersonalInfo('phone', e.target.value)} 
              placeholder="Telefono" 
            />
          </div>
          <Textarea 
            className="text-xs min-h-[80px] bg-muted/30" 
            value={data.personalInfo.summary} 
            onChange={e => updatePersonalInfo('summary', e.target.value)} 
            placeholder="Sommario..." 
          />
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">💼 Esperienze</h3>
          <Button onClick={addExperience} size="sm" variant="ghost" className="h-6 px-2 text-[10px]"><Plus size={12} /></Button>
        </div>
        <div className="space-y-4">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 size={10} className="text-destructive" />
              </Button>
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={exp.company} 
                onChange={e => updateExperience(exp.id, 'company', e.target.value)} 
                placeholder="Azienda"
              />
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={exp.position} 
                onChange={e => updateExperience(exp.id, 'position', e.target.value)} 
                placeholder="Ruolo"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={exp.startDate} 
                  onChange={e => updateExperience(exp.id, 'startDate', e.target.value)} 
                  placeholder="Inizio"
                />
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={exp.endDate} 
                  onChange={e => updateExperience(exp.id, 'endDate', e.target.value)} 
                  placeholder="Fine"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">🎓 Istruzione</h3>
          <Button onClick={addEducation} size="sm" variant="ghost" className="h-6 px-2 text-[10px]"><Plus size={12} /></Button>
        </div>
        <div className="space-y-3">
          {data.educations.map((edu) => (
            <div key={edu.id} className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 size={10} className="text-destructive" />
              </Button>
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={edu.school} 
                onChange={e => updateEducation(edu.id, 'school', e.target.value)} 
                placeholder="Università"
              />
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={edu.degree} 
                onChange={e => updateEducation(edu.id, 'degree', e.target.value)} 
                placeholder="Titolo"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">🌍 Lingue</h3>
          <Button onClick={addLanguage} size="sm" variant="ghost" className="h-6 px-2 text-[10px]"><Plus size={12} /></Button>
        </div>
        <div className="space-y-2">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex gap-2 relative group">
              <Input 
                className="h-7 text-[11px] bg-muted/30 flex-1" 
                value={lang.name} 
                onChange={e => updateLanguage(index, 'name', e.target.value)} 
                placeholder="Lingua"
              />
              <Input 
                className="h-7 text-[10px] bg-muted/30 w-24" 
                value={lang.level} 
                onChange={e => updateLanguage(index, 'level', e.target.value)} 
                placeholder="Livello"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeLanguage(index)}
              >
                <Trash2 size={10} className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">🚀 Progetti</h3>
          <Button onClick={addProject} size="sm" variant="ghost" className="h-6 px-2 text-[10px]"><Plus size={12} /></Button>
        </div>
        <div className="space-y-3">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeProject(proj.id)}
              >
                <Trash2 size={10} className="text-destructive" />
              </Button>
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={proj.name} 
                onChange={e => updateProject(proj.id, 'name', e.target.value)} 
                placeholder="Nome Progetto"
              />
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={proj.link} 
                onChange={e => updateProject(proj.id, 'link', e.target.value)} 
                placeholder="Link (opzionale)"
              />
              <Textarea 
                className="text-[10px] h-12 bg-white" 
                value={proj.description} 
                onChange={e => updateProject(proj.id, 'description', e.target.value)} 
                placeholder="Descrizione..."
              />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">🛠️ Competenze</h3>
        <div className="flex gap-2">
          <Input 
            className="h-8 text-xs bg-muted/30" 
            placeholder="Aggiungi competenza..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addSkill((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {data.skills.map((skill, index) => (
            <span key={index} className="flex items-center gap-1.5 px-2 py-0.5 bg-card border border-border rounded text-[10px] font-medium">
              {skill}
              <Trash2 
                size={8} 
                className="text-muted-foreground cursor-pointer hover:text-destructive transition-colors" 
                onClick={() => removeSkill(index)}
              />
            </span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">📜 Certificazioni</h3>
          <Button onClick={addCertification} size="sm" variant="ghost" className="h-6 px-2 text-[10px]"><Plus size={12} /></Button>
        </div>
        <div className="space-y-3">
          {data.certifications.map((cert) => (
            <div key={cert.id} className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeCertification(cert.id)}
              >
                <Trash2 size={10} className="text-destructive" />
              </Button>
              <Input 
                className="h-7 text-[11px] bg-white" 
                value={cert.name} 
                onChange={e => updateCertification(cert.id, 'name', e.target.value)} 
                placeholder="Nome Certificazione"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={cert.issuer} 
                  onChange={e => updateCertification(cert.id, 'issuer', e.target.value)} 
                  placeholder="Ente"
                />
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={cert.date} 
                  onChange={e => updateCertification(cert.id, 'date', e.target.value)} 
                  placeholder="Anno"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="space-y-4 pb-8">
        <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">🎨 Hobby & Interessi</h3>
        <div className="flex gap-2">
          <Input 
            className="h-8 text-xs bg-muted/30" 
            placeholder="Aggiungi interesse..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addInterest((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {data.interests.map((interest, index) => (
            <span key={index} className="flex items-center gap-1.5 px-2 py-0.5 bg-card border border-border rounded text-[10px] font-medium text-muted-foreground">
              {interest}
              <Trash2 
                size={8} 
                className="text-muted-foreground cursor-pointer hover:text-destructive transition-colors" 
                onClick={() => removeInterest(index)}
              />
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

