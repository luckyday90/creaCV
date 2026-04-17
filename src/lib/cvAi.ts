import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const CVAIProvider = {
  async rewriteText(text: string, tone: string = "professional") {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Riscrivi il seguente testo per un curriculum vitale con un tono ${tone}. Mantieni il contenuto ma migliora il copywriting e il lessico professionale:\n\n${text}`,
    });
    return response.text;
  },

  async translateCV(content: string, targetLang: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Traduci il seguente contenuto di un curriculum in ${targetLang}. Assicurati di usare la terminologia professionale corretta per il settore lavorativo:\n\n${content}`,
    });
    return response.text;
  },

  async getSuggestions(field: string, context: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Basandoti su questo contesto lavorativo: "${context}", suggerisci 3 frasi efficaci o punti elenco per la sezione "${field}" di un curriculum. Rispondi solo con i suggerimenti.`,
    });
    return response.text;
  },

  async checkFormattingAndKeywords(cvText: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analizza questo curriculum e fornisci un feedback sulla formattazione e una lista di parole chiave (keywords) mancanti che potrebbero essere utili per i sistemi ATS. Restituisci il risultato in formato JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            formattingFeedback: { type: Type.STRING },
            suggestedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            overallScore: { type: Type.NUMBER }
          },
          required: ["formattingFeedback", "suggestedKeywords", "overallScore"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  },

  async parseCVFromText(rawText: string, currentData?: any) {
    const mergeContext = currentData 
      ? `\n\nATTENZIONE: Di seguito l'oggetto JSON del Curriculum ATTUALE dell'utente. Il tuo compito è UNIRE le nuove informazioni estratte dal testo sovrastante a questo JSON. 
      REGOLE DI UNIONE MENTALE: 
      1. Se le esperienze lavorative, l'educazione o i progetti nel testo sono NUOVI rispetto al JSON, AGGIUNGILI agli array. 
      2. Se sembrano gli STESSI ma con più o meno dettagli, AGGIORNA l'item esistente fondendo i dati. 
      3. NON cancellare dati esistenti nel JSON a meno che non sia logicamente corretto farlo (es. dati placeholder base). Usa identificatori \`id\` casuali per i nuovi elementi.
      \nCurriculum Attuale (JSON):\n${JSON.stringify(currentData)}`
      : '';

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Estrai le informazioni da questo curriculum testo e produci un JSON strutturato. Se un campo non è presente e non c'è un dato corrente da salvare, usa stringhe o array vuoti. \n\nTESTO CURRICULUM:\n${rawText}${mergeContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personalInfo: {
              type: Type.OBJECT,
              properties: {
                fullName: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                location: { type: Type.STRING },
                website: { type: Type.STRING },
                jobTitle: { type: Type.STRING },
                summary: { type: Type.STRING }
              },
              required: ["fullName", "email", "phone", "location", "website", "jobTitle", "summary"]
            },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  company: { type: Type.STRING },
                  position: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["id", "company", "position", "startDate", "endDate", "description"]
              }
            },
            educations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  school: { type: Type.STRING },
                  degree: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["id", "school", "degree", "startDate", "endDate", "description"]
              }
            },
            publications: {
              type: Type.ARRAY,
              description: "Pubblicazioni accademiche, libri, articoli, paper o brevetti.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  publisher: { type: Type.STRING },
                  date: { type: Type.STRING },
                  isbn: { type: Type.STRING, description: "Codice ISBN, ISSN, DOI o altra referenza univoca." },
                  url: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["id", "title", "publisher", "date", "isbn", "url", "description"]
              }
            },
            customSections: {
              type: Type.ARRAY,
              description: "Sezioni aggiuntive come Premi, Volontariato, Servizio di Leva, etc.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        subtitle: { type: Type.STRING },
                        date: { type: Type.STRING },
                        description: { type: Type.STRING }
                      },
                      required: ["id", "title", "subtitle", "date", "description"]
                    }
                  }
                },
                required: ["id", "title", "items"]
              }
            },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  link: { type: Type.STRING }
                },
                required: ["id", "name", "description", "link"]
              }
            },
            languages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  level: { type: Type.STRING }
                },
                required: ["name", "level"]
              }
            },
            certifications: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  issuer: { type: Type.STRING },
                  date: { type: Type.STRING }
                },
                required: ["id", "name", "issuer", "date"]
              }
            },
            interests: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["personalInfo", "experiences", "educations", "publications", "customSections", "skills", "projects", "languages", "certifications", "interests"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
};
