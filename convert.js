import convertPdfToHtml from "./lib/pdf2html.js";
import convertHtmlLang from "./lib/langConverter.js";
import convertHtmlToPdf from "./lib/html2pdf.js";
import fs from "fs";

const pdfInputPath = process.argv[2];
// for project
const convertedPdfPath = process.argv[3];

// for now and for testing only
// const convertedPdfPath = "example.pdf"

const htmlOutputPath = pdfInputPath.replace(".pdf", ".html");
const convertedHtmlPath = "temp.html"

await convertPdfToHtml(pdfInputPath, htmlOutputPath)
await convertHtmlLang(htmlOutputPath, convertedHtmlPath, "zh-CN", "en")
await convertHtmlToPdf(convertedHtmlPath, convertedPdfPath)

// removing temporaray htmls in end
fs.rmSync(htmlOutputPath)
fs.rmSync(convertedHtmlPath)