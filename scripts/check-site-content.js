const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

if (!jsonLdMatch) {
    throw new Error('Missing JSON-LD script block');
}

const jsonLd = JSON.parse(jsonLdMatch[1]);
const faqPage = jsonLd['@graph'].find((item) => item['@type'] === 'FAQPage');

if (!faqPage) {
    throw new Error('Missing FAQPage JSON-LD entry');
}

const jsonLdFaqNames = faqPage.mainEntity.map((question) => question.name);

const requiredFaqs = [
    'What does "versioned" mean in Datalox?',
    'How do teams verify that a replay world matches the original environment?'
];

for (const question of requiredFaqs) {
    if (!html.includes(`<h3>${question}</h3>`)) {
        throw new Error(`Missing visible FAQ question: ${question}`);
    }
    if (!jsonLdFaqNames.includes(question)) {
        throw new Error(`Missing JSON-LD FAQ question: ${question}`);
    }
}

const faqCardCount = (html.match(/class="faq-item reveal"/g) || []).length;
if (faqCardCount !== 7) {
    throw new Error(`Expected 7 visible FAQ items, found ${faqCardCount}`);
}

console.log('site content ok');
