import convertPdfToHtml from "./lib/pdf2html.js";
import convertHtmlLang from "./lib/langConverter.js";
import convertHtmlToPdf from "./lib/html2pdf.js";
import fs from "fs";

const pdfInputPath = process.argv[2];
const convertedPdfPath = process.argv[3];
const toLang = process.argv[4];

if (fs.existsSync(pdfInputPath)) {
      const htmlOutputPath = pdfInputPath.replace(".pdf", ".html");
      const convertedHtmlPath = "temp.html"

      await convertPdfToHtml(pdfInputPath, htmlOutputPath)
      await convertHtmlLang(htmlOutputPath, convertedHtmlPath, toLang)
      await convertHtmlToPdf(convertedHtmlPath, convertedPdfPath)

      // removing temporaray htmls in end
      fs.rmSync(htmlOutputPath)
      fs.rmSync(convertedHtmlPath)
}
else{
      console.log(`Error: Input file path <${pdfInputPath}> does not exixts`)
}