import fs from 'fs';
import html_to_pdf from 'html-pdf-node';

// for text only
// const inputPath = process.argv[2]
// const outputPath = process.argv[3]
// convertHtmlToPdf(inputPath, outputPath);

const convertHtmlToPdf = async (htmlPath, outputPath) => {
      try {
            // converting html to pdf
            let options = { format: 'A4', path: outputPath };
            let file = { content: fs.readFileSync(htmlPath).toString() }
            html_to_pdf.generatePdf(file, options).then( __ => {
                  console.log("Message: Pdf generated successfully!!");
            });
      }
      catch (e) {
            console.log("Error: html to tdf failed")
      }
}

export default convertHtmlToPdf;