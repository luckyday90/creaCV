import React from 'react';
import { CVData } from '../types';
import { Input } from '@/components/ui-lib/input';
import { Textarea } from '@/components/ui-lib/textarea';
import { Label } from '@/components/ui-lib/label';
import { Button } from '@/components/ui-lib/button';
import { Plus, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui-lib/card';
import { ScrollArea } from '@/components/ui-lib/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui-lib/tabs';

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

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      educations: data.educations.filter(edu => edu.id !== id)
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

  const addPublication = () => {
    onChange({
      ...data,
      publications: [
        ...(data.publications || []),
        { id: Math.random().toString(), title: '', publisher: '', date: '', isbn: '', url: '', description: '' }
      ]
    });
  };

  const updatePublication = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      publications: data.publications.map(pub => pub.id === id ? { ...pub, [field]: value } : pub)
    });
  };

  const removePublication = (id: string) => {
    onChange({
      ...data,
      publications: data.publications.filter(pub => pub.id !== id)
    });
  };

  const addCustomSection = () => {
    onChange({
      ...data,
      customSections: [
        ...(data.customSections || []),
        { id: Math.random().toString(), title: 'Nuova Sezione', items: [] }
      ]
    });
  };

  const updateCustomSectionTitle = (sectionId: string, title: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(sec => sec.id === sectionId ? { ...sec, title } : sec)
    });
  };

  const removeCustomSection = (sectionId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.filter(sec => sec.id !== sectionId)
    });
  };

  const addCustomSectionItem = (sectionId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            items: [...sec.items, { id: Math.random().toString(), title: '', subtitle: '', date: '', description: '' }]
          };
        }
        return sec;
      })
    });
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, field: string, value: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            items: sec.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
          };
        }
        return sec;
      })
    });
  };

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(sec => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            items: sec.items.filter(item => item.id !== itemId)
          };
        }
        return sec;
      })
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

      {/* Publications */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-tight text-primary">📚 Pubblicazioni</h3>
          <Button onClick={addPublication} size="sm" variant="ghost" className="h-6 px-2 text-[10px]"><Plus size={12} /></Button>
        </div>
        <div className="space-y-3">
          {data.publications?.map((pub) => (
            <div key={pub.id} className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePublication(pub.id)}
              >
                <Trash2 size={10} className="text-destructive" />
              </Button>
              <Input 
                className="h-7 text-[11px] bg-white font-bold" 
                value={pub.title} 
                onChange={e => updatePublication(pub.id, 'title', e.target.value)} 
                placeholder="Titolo Pubblicazione"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={pub.publisher} 
                  onChange={e => updatePublication(pub.id, 'publisher', e.target.value)} 
                  placeholder="Sede editoriale / Rivista"
                />
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={pub.date} 
                  onChange={e => updatePublication(pub.id, 'date', e.target.value)} 
                  placeholder="Data (es. 2024)"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={pub.isbn} 
                  onChange={e => updatePublication(pub.id, 'isbn', e.target.value)} 
                  placeholder="ISBN / DOI / ISSN"
                />
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={pub.url} 
                  onChange={e => updatePublication(pub.id, 'url', e.target.value)} 
                  placeholder="URL (opzionale)"
                />
              </div>
              <Textarea 
                className="text-[10px] h-12 bg-white" 
                value={pub.description} 
                onChange={e => updatePublication(pub.id, 'description', e.target.value)} 
                placeholder="Autori o breve descrizione..."
              />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Sections */}
      {data.customSections?.map((section) => (
        <section key={section.id} className="space-y-4 pt-4 border-t border-border mt-4">
          <div className="flex items-center justify-between">
            <Input 
              className="text-[11px] font-bold uppercase tracking-tight text-primary h-7 px-1 bg-transparent border-transparent hover:border-input focus:border-input w-2/3"
              value={section.title}
              onChange={e => updateCustomSectionTitle(section.id, e.target.value)}
            />
            <div className="flex items-center gap-1">
              <Button onClick={() => addCustomSectionItem(section.id)} size="icon" variant="ghost" className="h-6 w-6"><Plus size={12} /></Button>
              <Button onClick={() => removeCustomSection(section.id)} size="icon" variant="ghost" className="h-6 w-6 text-destructive hover:text-destructive"><Trash2 size={12} /></Button>
            </div>
          </div>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id} className="p-3 bg-muted/20 border border-border rounded-lg space-y-2 relative group">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeCustomSectionItem(section.id, item.id)}
                >
                  <Trash2 size={10} className="text-destructive" />
                </Button>
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={item.title} 
                  onChange={e => updateCustomSectionItem(section.id, item.id, 'title', e.target.value)} 
                  placeholder="Titolo elemento"
                />
                <Input 
                  className="h-7 text-[11px] bg-white" 
                  value={item.subtitle} 
                  onChange={e => updateCustomSectionItem(section.id, item.id, 'subtitle', e.target.value)} 
                  placeholder="Sottotitolo / Ruolo (opzionale)"
                />
                <Input 
                  className="h-7 text-[11px] bg-white w-1/2" 
                  value={item.date} 
                  onChange={e => updateCustomSectionItem(section.id, item.id, 'date', e.target.value)} 
                  placeholder="Data o Anno (opzionale)"
                />
                <Textarea 
                  className="text-[10px] h-12 bg-white" 
                  value={item.description} 
                  onChange={e => updateCustomSectionItem(section.id, item.id, 'description', e.target.value)} 
                  placeholder="Descrizione (opzionale)..."
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Button to add new custom section */}
      <div className="pt-2">
        <Button onClick={addCustomSection} variant="outline" size="sm" className="w-full text-xs font-medium border-dashed border-primary/30 text-primary hover:bg-primary/5">
          <Plus size={14} className="mr-2" /> Aggiungi Nuova Sezione Custom
        </Button>
      </div>

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

