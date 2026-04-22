import React from 'react';
import { CVData, BottomImage } from '../types';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: CVData;
  bottomImage?: BottomImage;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, bottomImage }) => {
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

          {data.publications && data.publications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 uppercase tracking-wide">Pubblicazioni</h2>
              <div className="space-y-4">
                {data.publications.map((pub) => (
                  <div key={pub.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{pub.title}</h3>
                      <span className="text-sm text-slate-500 italic font-medium">{pub.date}</span>
                    </div>
                    <p className="text-slate-600 text-sm font-semibold">
                      {pub.publisher} 
                      {pub.isbn && <span className="text-slate-400 font-normal ml-1">| ISBN/DOI: {pub.isbn}</span>}
                    </p>
                    {pub.description && <p className="text-slate-700 text-sm mt-1 whitespace-pre-wrap">{pub.description}</p>}
                    {pub.url && <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary/80 hover:text-primary mt-1 inline-block break-all">{pub.url}</a>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.customSections && data.customSections.map(section => (
            <section key={section.id}>
              <h2 className="text-lg font-bold border-b border-slate-200 mb-4 pb-1 uppercase tracking-wide">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      {item.date && <span className="text-sm text-slate-500 italic font-medium">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-slate-600 text-sm font-semibold">{item.subtitle}</p>}
                    {item.description && <p className="text-slate-700 text-sm mt-1 whitespace-pre-wrap">{item.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}

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
      
      <div className="mt-16 text-center text-[10px] text-slate-400 font-medium z-10 relative">
        Curriculum generato con <a href="https://www.zenone.it" target="_blank" rel="noopener noreferrer" className="hover:text-primary">WWW.ZENONE.IT</a>
      </div>

      {bottomImage && (
        <div className="absolute bottom-8 right-8 w-[220px]">
           <img src={bottomImage.url} alt="Firma o Immagine" className="w-full object-contain mix-blend-multiply" style={{ maxHeight: '120px' }} referrerPolicy="no-referrer" />
        </div>
      )}
    </div>
  );
};

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, bottomImage }) => {
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

        {data.publications && data.publications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">Pubblicazioni</h2>
            <div className="space-y-3">
              {data.publications.map((pub) => (
                <div key={pub.id} className="text-xs">
                  <div className="flex justify-between font-bold text-sm">
                    <span>{pub.title}</span>
                    <span>{pub.date}</span>
                  </div>
                  <div className="italic">{pub.publisher} {pub.isbn && <span className="font-normal text-gray-500">- ISBN/DOI: {pub.isbn}</span>}</div>
                  {pub.description && <p className="text-justify leading-relaxed whitespace-pre-wrap mt-1">{pub.description}</p>}
                  {pub.url && <div className="text-gray-500 mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{pub.url}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.map(section => (
          <section key={section.id}>
            <h2 className="text-sm font-bold border-b-2 border-black mb-3 pb-0.5 uppercase tracking-widest">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between font-bold text-sm">
                    <span>{item.title}</span>
                    {item.date && <span>{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="italic text-sm">{item.subtitle}</div>}
                  {item.description && <p className="text-xs text-justify leading-relaxed whitespace-pre-wrap">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}

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

      <div className="mt-16 text-center text-[10px] text-gray-400 font-sans tracking-wide z-10 relative">
        Curriculum generato con <a href="https://www.zenone.it" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:underline">WWW.ZENONE.IT</a>
      </div>

      {bottomImage && (
        <div className="absolute bottom-8 right-8 w-[220px]">
           <img src={bottomImage.url} alt="Firma o Immagine" className="w-full object-contain mix-blend-multiply" style={{ maxHeight: '120px' }} referrerPolicy="no-referrer" />
        </div>
      )}
    </div>
  );
};

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data, bottomImage }) => {
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

        {data.publications && data.publications.length > 0 && (
          <section className="flex gap-10 border-t border-zinc-100 pt-10">
            <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">Publications</div>
            <div className="flex-1 space-y-6">
              {data.publications.map(pub => (
                <div key={pub.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm">{pub.title}</h3>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-tighter">{pub.date}</span>
                  </div>
                  <div className="text-xs text-zinc-500 mb-1 font-medium">{pub.publisher} {pub.isbn && `— ISBN/DOI: ${pub.isbn}`}</div>
                  {pub.description && <p className="text-xs text-zinc-600 leading-normal mb-1 whitespace-pre-wrap">{pub.description}</p>}
                  {pub.url && <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-400 hover:text-zinc-900 break-all block">{pub.url}</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.customSections && data.customSections.map((section) => (
          <section key={section.id} className="flex gap-10 border-t border-zinc-100 pt-10">
            <div className="w-32 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-400">{section.title}</div>
            <div className="flex-1 space-y-6">
              {section.items.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm">{item.title}</h3>
                    {item.date &&  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-tighter">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="text-xs text-zinc-500 mb-1 font-medium">{item.subtitle}</div>}
                  {item.description && <p className="text-xs text-zinc-600 leading-normal whitespace-pre-wrap">{item.description}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>

      <div className="mt-20 text-center text-[9px] font-mono uppercase tracking-widest text-zinc-300 z-10 relative">
        Created via <a href="https://www.zenone.it" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-600">WWW.ZENONE.IT</a>
      </div>

      {bottomImage && (
        <div className="absolute bottom-8 right-8 w-[220px]">
           <img src={bottomImage.url} alt="Firma o Immagine" className="w-full object-contain mix-blend-multiply" style={{ maxHeight: '120px' }} referrerPolicy="no-referrer" />
        </div>
      )}
    </div>
  );
};

export const ZenoneTemplate: React.FC<TemplateProps> = ({ data, bottomImage }) => {
  return (
    <div id="cv-preview" className="bg-white text-[#333] min-h-[1120px] font-sans flex w-[800px] relative pb-24">
      {/* Sidebar */}
      <div className="w-[30%] bg-[#edf3f0] p-8 shrink-0 flex flex-col pt-12">
        <h2 className="text-[#2b5945] font-bold text-[13px] uppercase tracking-wider mb-6 leading-tight">Software<br/>conosciuti</h2>
        <div className="space-y-2 mb-12">
          {data.skills.map((skill, i) => (
            <div key={i} className="flex justify-between items-center text-[10px]">
              <span className="font-medium text-slate-800 truncate pr-2">{skill}</span>
              <div className="flex gap-0.5 shrink-0">
                {[1, 2, 3, 4, 5].map(dot => (
                   <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= 4 ? 'bg-[#2b5945]' : 'bg-[#c5d3cd]'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[#2b5945] font-bold text-[13px] uppercase tracking-wider mb-6 leading-tight">Lingue</h2>
        <div className="space-y-2 mb-12">
          {data.languages.map((lang, i) => (
            <div key={i} className="flex justify-between items-center text-[10px]">
              <span className="font-medium text-slate-800 truncate pr-2">{lang.name}</span>
              <div className="flex gap-0.5 shrink-0">
                {[1, 2, 3, 4, 5].map(dot => (
                   <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (lang.level === 'Madrelingua' ? 5 : 3) ? 'bg-[#2b5945]' : 'bg-[#c5d3cd]'}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 pt-12">
        <h1 className="text-3xl font-extrabold text-[#2b5945] mb-2 uppercase tracking-wide">{data.personalInfo.fullName}</h1>
        {data.personalInfo.jobTitle && <p className="text-[#2b5945] font-semibold text-sm mb-6">{data.personalInfo.jobTitle}</p>}
        {data.personalInfo.summary && (
           <p className="text-sm font-medium text-slate-700 leading-relaxed mb-8">{data.personalInfo.summary}</p>
        )}

        <div className="space-y-8">
          <section>
            <h2 className="text-[#2b5945] font-bold text-[13px] uppercase tracking-wider mb-4 border-b border-[#edf3f0] pb-1">Esperienze Professionali</h2>
            <div className="space-y-6">
              {data.experiences.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-[13px] text-slate-900 mb-1">{exp.position}</h3>
                  <div className="text-[10px] text-slate-400 mb-2 font-medium">{exp.startDate} - {exp.endDate}</div>
                  <div className="text-[12px] font-semibold text-slate-700 mb-2">{exp.company}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-[#2b5945] font-bold text-[13px] uppercase tracking-wider mb-4 border-b border-[#edf3f0] pb-1">Istruzione</h2>
             <div className="space-y-6">
                {data.educations.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[13px] text-slate-900 mb-1">{edu.degree}</h3>
                    <div className="text-[10px] text-slate-400 mb-2 font-medium">{edu.startDate} - {edu.endDate}</div>
                    <div className="text-[12px] font-semibold text-slate-700 mb-2">{edu.school}</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">{edu.description}</p>
                  </div>
                ))}
             </div>
          </section>

          {data.publications && data.publications.length > 0 && (
             <section>
               <h2 className="text-[#2b5945] font-bold text-[13px] uppercase tracking-wider mb-4 border-b border-[#edf3f0] pb-1">Pubblicazioni</h2>
               <div className="space-y-6">
                  {data.publications.map((pub) => (
                    <div key={pub.id}>
                      <h3 className="font-bold text-[13px] text-slate-900 mb-1">{pub.title}</h3>
                      <div className="text-[10px] text-slate-400 mb-1 font-medium">{pub.date}</div>
                      <div className="text-[11px] text-slate-700 mb-1">{pub.publisher} {pub.isbn && `- ISBN: ${pub.isbn}`}</div>
                      <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">{pub.description}</p>
                    </div>
                  ))}
               </div>
             </section>
          )}

          {data.customSections && data.customSections.map(section => (
            <section key={section.id}>
               <h2 className="text-[#2b5945] font-bold text-[13px] uppercase tracking-wider mb-4 border-b border-[#edf3f0] pb-1">{section.title}</h2>
               <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <h3 className="font-bold text-[13px] text-slate-900 mb-1">{item.title}</h3>
                      {item.date && <div className="text-[10px] text-slate-400 mb-2 font-medium">{item.date}</div>}
                      {item.subtitle && <div className="text-[12px] font-semibold text-slate-700 mb-2">{item.subtitle}</div>}
                      <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                    </div>
                  ))}
               </div>
            </section>
          ))}
        </div>
      </div>

      {bottomImage && (
        <div className="absolute bottom-8 left-8 w-[220px]">
           <img src={bottomImage.url} alt="Immagine di fondo" className="w-full object-contain mix-blend-multiply" style={{ maxHeight: '120px' }} referrerPolicy="no-referrer" />
        </div>
      )}
    </div>
  );
};

export const TechnicalTemplate: React.FC<TemplateProps> = ({ data, bottomImage }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`;

  return (
    <div id="cv-preview" className="bg-white text-black p-12 min-h-[1120px] font-sans w-[800px] border border-gray-200 shadow-sm relative">
      <header className="text-center mb-10">
        <h1 className="text-[28px] font-bold text-[#005a8d] uppercase tracking-[0.15em] mb-6">RIEPILOGO CURRICULUM</h1>
        <div className="flex justify-center mb-6">
          <img src={qrUrl} alt="QR Code" className="w-24 h-24 border border-gray-300 p-1" referrerPolicy="no-referrer" />
        </div>
        <div className="text-[13px] font-medium leading-tight">
          Curriculum (Codice <span className="font-bold">3K3E2H15TP</span>)
        </div>
        <div className="text-[11px] text-gray-500 mt-2">Riepilogo dei dati inseriti:</div>
      </header>

      <div className="space-y-6">
        <section>
          <h2 className="text-[12px] font-bold text-[#005a8d] uppercase border-b border-gray-200 pb-1 mb-3">TRATTAMENTO DEI DATI PERSONALI</h2>
          <div className="space-y-1.5 text-[10px] leading-tight text-gray-800">
            <div className="flex gap-2">
              <span className="font-bold shrink-0">☑</span>
              <span>Confermo di aver letto e ben compreso l’informativa sul trattamento dati</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold shrink-0">☑</span>
              <span>Rilascio dichiarazione sostitutiva di certificazione e/o atto di notorietà ai sensi degli artt. 46 e 47 del D.P.R. n° 445 del 28/12/2000 e s.m.i. - Testo Unico delle disposizioni amministrative e regolamentari in materia di documentazione amministrativa</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold shrink-0">☑</span>
              <span>Dichiaro di essere consapevole che, in caso di dichiarazioni non veritiere, verranno applicate le sanzioni penali previste e la decadenza dal beneficio ottenuto sotto la mia personale responsabilità (artt. 75 e 76 D.P.R n° 445 del 28/12/2000 e s.m.i.)</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[12px] font-bold text-[#005a8d] uppercase border-b border-gray-200 pb-1 mb-3">ANAGRAFICA</h2>
          <div className="grid grid-cols-1 gap-y-0.5 text-[11px] leading-snug">
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Cognome:</span> <span className="font-bold uppercase">{data.personalInfo.fullName.split(' ').slice(-1)[0] || 'COGNOME'}</span></div>
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Nome:</span> <span className="font-bold uppercase">{data.personalInfo.fullName.split(' ').slice(0, -1).join(' ') || 'NOME'}</span></div>
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Sesso:</span> <span className="font-bold">Uomo</span></div>
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Nato/a il:</span> <span className="font-bold text-[#005a8d]">09/11/1975</span></div>
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Email:</span> <span className="font-bold lowercase">{data.personalInfo.email}</span></div>
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Cellulare:</span> <span className="font-bold">{data.personalInfo.phone}</span></div>
            <div className="flex"><span className="w-44 shrink-0 text-gray-600">Indirizzo di residenza:</span> <span className="font-bold uppercase">{data.personalInfo.location || 'Indirizzo non specificato'}</span></div>
          </div>
        </section>

        <section>
          <h2 className="text-[12px] font-bold text-[#005a8d] uppercase border-b border-gray-200 pb-1 mb-3">ESPERIENZE LAVORATIVE</h2>
          <div className="space-y-5">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="text-[11px] space-y-0.5">
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Esperienza iniziata il:</span> <span className="font-bold text-[#005a8d]">{exp.startDate}</span></div>
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Esperienza terminata il:</span> <span className="font-bold text-[#005a8d]">{exp.endDate}</span></div>
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Ente o Azienda privata:</span> <span className="font-bold uppercase">{exp.company}</span></div>
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Qualifica:</span> <span className="font-bold uppercase">{exp.position}</span></div>
                {exp.description && (
                  <div className="mt-1 text-[10px] text-gray-700 leading-tight">
                    <span className="text-gray-400 italic">Descrizione attività:</span> {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[12px] font-bold text-[#005a8d] uppercase border-b border-gray-200 pb-1 mb-3">TITOLI DI STUDIO E ATTESTAZIONI</h2>
          <div className="space-y-4">
            {data.educations.map((edu) => (
              <div key={edu.id} className="text-[11px] space-y-0.5">
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Denominazione:</span> <span className="font-bold uppercase">{edu.degree}</span></div>
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Rilasciato da:</span> <span className="font-bold uppercase">{edu.school}</span></div>
                <div className="flex"><span className="w-48 shrink-0 text-gray-500">Conseguito in data:</span> <span className="font-bold text-[#005a8d]">{edu.endDate}</span></div>
                {edu.description && <div className="mt-1 text-[10px] text-gray-600 leading-tight italic">{edu.description}</div>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="absolute bottom-10 left-12 right-12 flex justify-between items-end">
        <div className="text-[10px] text-gray-400 font-mono">
          Pagina 1 di 1
        </div>
        <div>
          {bottomImage && (
            <img src={bottomImage.url} alt="Immagine di fondo" className="h-16 object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
          )}
        </div>
      </div>
    </div>
  );
};
