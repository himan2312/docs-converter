import fs from "fs"
import cheerio from "cheerio";
const url = "http://localhost:9090/apps/neuranet/llmflow";
const reqObj = {
    "id": "himanshu.gupta@gmail.com",
    "org": "deeplogictech",
    "aiappid": "deepaiapp",
    "flow": "doctranslate_flow"
}

// for testing only
// const inputHTMLPath = 'input.html'; // Path to the input HTML file
// const outputHTMLPath = 'output.html'; // Path for the output HTML file
// const toLang = 'es'; // Target language (e.g., 'es' for Spanish)
// translateHtml(inputHTMLPath, outputHTMLPath, toLang);

// Function to translate text
async function translateText(text, toLang) {
    if (text === "") return text;
    reqObj.question = text, reqObj.tolang = toLang;
    let response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqObj) }); response = await response.json();
    if (response.result) return response.text; else return text;
}

// Function to translate inner text of HTML to a particular language
async function translateHtml(htmlPath, outputPath, toLang) {
    try {
        const html = fs.readFileSync(htmlPath, "utf8");

        // Create a cheerio from the HTML string
        const $ = cheerio.load(html), textNodes = [];

        // Traverse and find all text nodes
        $('body').find('*').contents().each((ind, element) => {
                if (element.type === 'text' && element.data.trim() !== '') {
                    textNodes.push(element); } });

        for (const node of textNodes) {
            const originalText = node.data.trim();
            const translatedText = await translateText(originalText, toLang);
            node.data = node.data.replace(originalText, translatedText);
        }

        const translatedHtml = $.html();
        fs.writeFileSync(outputPath, translatedHtml);
    } catch (error) {
        console.error('Translation Error:', error);
    }
}

export default translateHtml;