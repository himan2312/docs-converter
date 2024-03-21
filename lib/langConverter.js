import fs from "fs"
// import translate from "google-translate-api";
import { parseFromString } from 'dom-parser'

// Function to translate text
async function translateText(text, fromLang, toLang) {
    // for now returning the text without converting it
    console.log(text);
    return text;

    // the snippet commented below throwing error while converting text using tran.google.api
    // translate(text, { to: 'en' }).then(res => {
    //     console.log(res.text);
    //     return res.text;
    // }).catch(err => {
    //     console.error('Translation Error:', err.message);
    // });
}

// Function to recursively traverse and translate HTML nodes
async function translateHtmlNodes(node, fromLang, toLang) {
    if (node.nodeType === 3) { // Text node
        if (node.text && node.text !== "\n" && node.text != "") {
            // console.log("tranlating",`0${node.text.trim()}0`)
            node.text = await translateText(node.text.trim(), fromLang, toLang);
        }
    } else if (node.nodeType === 1) { // Element node
        for (let childNode of node.childNodes) {
            await translateHtmlNodes(childNode, fromLang, toLang);
        }
    }
}

// Function to translate inner text of HTML to a particular language
async function translateHtml(htmlPath, outputPath, fromLang, toLang) {
    try {
        const html = fs.readFileSync(htmlPath);

        // Create a DOM tree from the HTML string
        const dom = parseFromString(html.toString());

        // // Translate inner text of HTML nodes
        await translateHtmlNodes(dom.getElementsByTagName("body")[0], fromLang, toLang);

        console.log("\nthese are the text extracted for conversion\n")

        // Write translated HTML to file
        fs.writeFileSync(outputPath, dom.rawHTML);
    } catch (error) {
        console.error('Translation Error:', error);
    }
}

// for testing only
// const inputHTMLPath = 'input.html'; // Path to the input HTML file
// const outputHTMLPath = 'output.html'; // Path for the output HTML file
// const fromLang = 'en'; // Source language (e.g., 'en' for English)
// const toLang = 'es'; // Target language (e.g., 'es' for Spanish)

export default translateHtml;