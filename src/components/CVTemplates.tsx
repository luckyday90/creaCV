import React from 'react';
import { CVData } from '../types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div id="cv-preview" className="bg-white text-slate-800 p-8 min-h-[1120px] font-sans w-[800px]">
      <div className="flex justify-between items-start border-b-2 border-primary pb-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{data.personalInfo.fullName || 'Il Tuo Nome'}</h1>
          <p className="text-xl text-slate-600 mt-1 uppercase tracking-wider font-medium">{data.personalInfo.jobTitle || 'Professione'}</p>
        </div>
        <div className="text-right text-sm space-y-1 text-slate-500">
          {data.personalInfo.email && <div className="flex items-center justify-end gap-2">{data.personalInfo.email} <Mail size={14} /></div>}
          {data.personalInfo.phone && <div className="flex items-center justify-end gap-2">{data.personalInfo.phone} <Phone size={14} /></div>}
          {data.personalInfo.location && <div className="flex items-center justify-end gap-2">{data.personalInfo.location} <MapPin size={14} /></div>}
          {data.personalInfo.website && <div className="flex items-center justify-end gap-2">{data.personalInfo.website} <Globe size={14} /></div>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-bold border-b border-slate-200 mb-3 pb-1 uppercase tracking-wide">Profilo Professionale</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{data.personalInfo.summary || 'Aggiungi un riepilogo professionale...'}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 uppercase tracking-wide">Esperienza Lavorativa</h2>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-sm text-slate-500 italic font-medium">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-slate-600 text-sm font-semibold mb-2">{exp.company}</p>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 uppercase tracking-wide">Istruzione</h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <span className="text-sm text-slate-500 italic font-medium">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-slate-600 text-sm font-semibold">{edu.school}</p>
                  <p className="text-slate-700 text-xs mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 uppercase tracking-wide">Certificazioni</h2>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-sm">{cert.name}</h3>
                      <span className="text-xs text-slate-500 italic">{cert.date}</span>
                    </div>
                    <p className="text-slate-600 text-xs font-medium">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold border-b border-slate-200 mb-3 pb-1 uppercase tracking-wide">Competenze</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-slate-100 px-2 py-1 text-xs rounded text-slate-700 font-medium border border-slate-200">{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold border-b border-slate-200 mb-3 pb-1 uppercase tracking-wide">Lingue</h2>
            <div className="space-y-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-slate-500">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>

          {data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b border-slate-200 mb-3 pb-1 uppercase tracking-wide">Progetti</h2>
              <div className="space-y-3">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="text-sm">
                    <div className="font-bold flex items-center gap-1">
                      {proj.name} {proj.link && <ExternalLink size={12} className="text-slate-400" />}
                    </div>
                    <p className="text-slate-600 text-xs leading-tight">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.interests && data.interests.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b border-slate-200 mb-3 pb-1 uppercase tracking-wide">Interessi</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.interests.map((interest, i) => (
                  <span key={i} className="text-xs text-slate-600 italic">#{interest}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div id="cv-preview" className="bg-white text-black p-12 min-h-[1120px] font-serif leading-normal uppercase-headers">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.fullName || 'Il Tuo Nome'}</h1>
        <div className="text-sm flex justify-center flex-wrap gap-x-4 gap-y-1 text-gray-700">
           {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
           {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
           {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
           {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-bold border-b-2 border-black mb-2 pb-0.5 uppercase tracking-widest text-center">Profilo</h2>
          <p className="text-sm italic text-center max-w-2xl mx-auto">{data.personalInfo.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">Esperienza</h2>
          <div className="space-y-5">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-sm">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="italic text-sm mb-1">{exp.position}</div>
                <p className="text-xs text-justify leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">Istruzione</h2>
          <div className="space-y-4">
            {data.educations.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-sm">
                   <span>{edu.school}</span>
                   <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="italic text-sm">{edu.degree}</div>
                <p className="text-xs">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">Certificazioni</h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <span className="font-bold">{cert.name}</span> — <span className="italic">{cert.issuer}</span> ({cert.date})
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">Competenze</h2>
            <p className="text-xs leading-relaxed">{data.skills.join(', ')}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">Lingue</h2>
             <div className="space-y-1">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span>{lang.name}</span>
                  <span className="italic">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {data.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-sm font-bold border-b-2 border-black mb-1 pb-0.5 uppercase tracking-widest text-center">Interessi</h2>
            <p className="text-[10px] italic text-center text-gray-600">{data.interests.join(' • ')}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
  return (
    <div id="cv-preview" className="bg-white text-zinc-900 p-10 min-h-[1120px] font-sans">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-zinc-900 mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex gap-4 text-xs font-mono text-zinc-500 uppercase tracking-tighter">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="space-y-10">
        <section className="flex gap-10">
          <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Bio</div>
          <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </section>

        <section className="flex gap-10 border-t border-zinc-100 pt-10">
          <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Experience</div>
          <div className="flex-1 space-y-8">
            {data.experiences.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-sm">{exp.position}</h3>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-tighter">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-xs text-zinc-500 mb-2 font-medium">{exp.company}</div>
                <p className="text-xs text-zinc-600 leading-normal">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex gap-10 border-t border-zinc-100 pt-10">
          <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Education</div>
          <div className="flex-1 space-y-4">
            {data.educations.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm">{edu.school}</h3>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</span>
                </div>
                <div className="text-xs text-zinc-500">{edu.degree}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex gap-10 border-t border-zinc-100 pt-10 pb-10">
          <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Details</div>
          <div className="flex-1 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Skills</h4>
              <p className="text-xs leading-relaxed">{data.skills.join(' / ')}</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Languages</h4>
              <div className="space-y-1">
                {data.languages.map((l, i) => (
                  <div key={i} className="text-xs flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-zinc-400">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {data.certifications && data.certifications.length > 0 && (
          <section className="flex gap-10 border-t border-zinc-100 pt-10">
            <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Certs</div>
            <div className="flex-1 space-y-2">
              {data.certifications.map(cert => (
                <div key={cert.id} className="text-xs">
                  <span className="font-bold">{cert.name}</span> <span className="text-zinc-400">— {cert.issuer} ({cert.date})</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.interests && data.interests.length > 0 && (
          <section className="flex gap-10 border-t border-zinc-100 pt-10">
            <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Interests</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {data.interests.map((interest, i) => (
                <span key={i} className="text-xs text-zinc-600 italic">#{interest}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
