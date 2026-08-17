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

const requiredProviders = [
    'Datadog',
    'GitHub REST',
    'Opentrons',
    'Cromwell',
    'OpenFDA',
    'RCSB PDB'
];

for (const provider of requiredProviders) {
    if (!html.includes(`<h3>${provider}</h3>`)) {
        throw new Error(`Missing representative provider: ${provider}`);
    }
}

const providerStripMatch = html.match(/<div class="provider-strip reveal"[\s\S]*?<\/div>\s*<div class="coverage-footer">/);
if (!providerStripMatch) {
    throw new Error('Missing representative provider strip');
}

const providerStrip = providerStripMatch[0];
const providerLogoCount = (providerStrip.match(/<img src="https:\/\/www\.google\.com\/s2\/favicons\?/g) || []).length;
if (providerLogoCount !== 6) {
    throw new Error(`Expected 6 representative provider icon images, found ${providerLogoCount}`);
}

if (html.includes('source-grid') || html.includes('Provider Inventory')) {
    throw new Error('Homepage must not present provider coverage as a primary inventory grid');
}

const providerSectionIndex = html.indexOf('<section id="fixtures"');
const trackSectionIndex = html.indexOf('<section id="tracks"');
const answerSectionIndex = html.indexOf('<section id="answer"');
const environmentSectionIndex = html.indexOf('<section id="environments"');
const worldSectionIndex = html.indexOf('<section id="world"');
const howItWorksSectionIndex = html.indexOf('<section id="how-it-works"');

if ([providerSectionIndex, trackSectionIndex, answerSectionIndex, environmentSectionIndex, worldSectionIndex, howItWorksSectionIndex].includes(-1)) {
    throw new Error('Missing required top-level page sections');
}

if (providerSectionIndex < worldSectionIndex || providerSectionIndex > howItWorksSectionIndex) {
    throw new Error('Grounding Coverage must support the product story after Inside A World');
}

const requiredInventoryFacts = [
    '<strong>50</strong><span>executable environment assets</span>',
    '<strong>24</strong><span>probed or captured replay assets</span>',
    '<strong>20</strong><span>admitted stateful worlds</span>'
];

for (const fact of requiredInventoryFacts) {
    if (!html.includes(fact)) {
        throw new Error(`Missing checked grounding inventory fact: ${fact}`);
    }
}

const trackSectionMatch = html.match(/<section id="tracks"[\s\S]*?<\/section>/);
if (!trackSectionMatch) {
    throw new Error('Missing evaluation track section');
}

const trackSection = trackSectionMatch[0];
const trackCount = (trackSection.match(/class="track-row"/g) || []).length;
if (trackCount !== 4) {
    throw new Error(`Expected 4 evaluation tracks, found ${trackCount}`);
}

if (!trackSection.includes('Model results will be added only after')) {
    throw new Error('Evaluation section must not imply unpublished model results');
}

const workflowSectionMatch = html.match(/<section id="workflows"[\s\S]*?<\/section>/);
if (!workflowSectionMatch) {
    throw new Error('Missing recorded workflow showcase');
}

const workflowSection = workflowSectionMatch[0];
const workflowVideoCount = (workflowSection.match(/<video controls/g) || []).length;
if (workflowVideoCount !== 3) {
    throw new Error(`Expected 3 recorded workflow videos, found ${workflowVideoCount}`);
}

if (workflowSection.includes('autoplay')) {
    throw new Error('Workflow recordings must not autoplay');
}

const workflowSectionIndex = html.indexOf('<section id="workflows"');
if (workflowSectionIndex === -1 || workflowSectionIndex > trackSectionIndex) {
    throw new Error('Recorded workflow showcase must appear before Evaluation Tracks');
}

const showcaseAssets = [
    'thermocycler-qpcr.mp4',
    'incubator-growth.mp4',
    'powder-formulation.mp4',
    'thermocycler-qpcr-cover.png',
    'incubator-growth-cover.png',
    'powder-formulation-cover.png'
];

for (const asset of showcaseAssets) {
    const assetPath = `assets/showcase/${asset}`;
    if (!fs.existsSync(assetPath) || fs.statSync(assetPath).size < 1000) {
        throw new Error(`Missing or empty workflow showcase asset: ${assetPath}`);
    }
    if (!workflowSection.includes(assetPath)) {
        throw new Error(`Workflow showcase does not reference asset: ${assetPath}`);
    }
}

console.log('site content ok');
