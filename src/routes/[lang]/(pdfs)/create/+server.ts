import puppeteer from "puppeteer";
import type { RequestHandler } from "@sveltejs/kit";
import { minimal } from "../templates/minimal.ts";
// Define the PDF interface and related types
interface PDFItem {
  name: string;
  value: number;
}

interface PDFData {
  title: string;
  date: string;
  items: PDFItem[];
  summary: string;
}


export const POST: RequestHandler = async ({ request }) => {
  try {
    // const customData: PDFData = await request.json();

    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    await page.setContent(minimal, {
      waitUntil: 'networkidle0' 
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });


    await browser.close();
    

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="generated.pdf"'
      }
    });
  }
  catch(error) {
    console.error('PDF generation error:', error);
    return new Response(JSON.stringify({ error: "Failed to generate PDF" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};