import fs from 'fs'
import html_to_pdf from 'html-pdf-node'
//import required lib

// for text only
// const pdfPath = process.argv[2]
// const outputPath = process.argv[3]

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