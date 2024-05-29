import fs from 'fs'
import pdf2html from 'pdf2html'

// for texting only
// const inputPath = process.argv[2]
// const outputPath = process.argv[3]
// convertPdfToHtml(inputPath, outputPath);

const convertPdfToHtml = async (pdfPath, outputPath) => {
      try {
            const html = await pdf2html.html(pdfPath, { maxBuffer: 1024 * 10000 });
            fs.writeFileSync(outputPath, html)
      }
      catch (e) {
            console.log("Error: pdf to html failed")
      }
}

export default convertPdfToHtml;