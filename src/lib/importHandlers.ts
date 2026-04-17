import * as mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist';
import Tesseract from 'tesseract.js';

// Configure PDF.js worker
// In a Vite environment, we can use the legacy build or a CDN for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const extractTextFromDocx = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export const extractTextFromImage = async (file: File): Promise<string> => {
  const { data: { text } } = await Tesseract.recognize(file, 'ita+eng', {
    logger: m => console.log('OCR Progress:', m.status, Math.round(m.progress * 100) + '%')
  });
  return text;
};

export const extractTextFromPdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }

  // Se il PDF ha pochissimo testo, assumiamo sia una scansione e usiamo l'OCR
  if (fullText.trim().length < 50) {
    console.log("Poco o nessun testo vettoriale trovato nel PDF. Avvio l'OCR per le immagini contenute...");
    fullText = ''; // Reset the text
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 }); // Risoluzione x2 per un OCR migliore
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      
      await page.render(renderContext).promise;
      const imgData = canvas.toDataURL('image/png');
      
      const { data: { text } } = await Tesseract.recognize(imgData, 'ita+eng', {
        logger: m => console.log('OCR Progress:', m.status, Math.round(m.progress * 100) + '%')
      });
      fullText += text + '\n';
    }
  }

  return fullText;
};

export const handleFileImport = async (file: File): Promise<string> => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  if (extension === 'docx') {
    return await extractTextFromDocx(file);
  } else if (extension === 'pdf') {
    return await extractTextFromPdf(file);
  } else if (extension === 'txt') {
    return await file.text();
  } else if (['jpg', 'jpeg', 'png', 'webp'].includes(extension || '')) {
    return await extractTextFromImage(file);
  } else {
    throw new Error('Formato file non supportato. Usa PDF, DOCX, TXT o file immagine (JPG, PNG).');
  }
};
