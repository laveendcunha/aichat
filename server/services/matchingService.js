import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { decisionFlows } from '../data/decisionFlows.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data/safetyData.json');
let safetyData = [];

try {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  safetyData = JSON.parse(rawData);
} catch (err) {
  console.error('Error loading safetyData.json:', err.message);
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her',
  'to', 'for', 'of', 'in', 'on', 'at', 'by', 'with', 'about', 'against',
  'do', 'does', 'did', 'can', 'could', 'should', 'would', 'shall', 'may',
  'what', 'why', 'how', 'when', 'where', 'who', 'which', 'if', 'or', 'and', 'but'
]);

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTokens(normalizedText) {
  return normalizedText
    .split(' ')
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

function calculateJaccardSimilarity(tokensA, tokensB) {
  if (!tokensA.length || !tokensB.length) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);
  
  let intersection = 0;
  for (const token of setA) {
    if (setB.has(token)) intersection++;
  }
  
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Checks if input triggers an interactive Decision Flow
 */
function checkForDecisionTrigger(normalizedQuery) {
  // Helmet decision trigger
  const helmetTriggers = [
    'i am riding a bike',
    'riding a bike',
    'riding motorcycle',
    'riding scooter',
    'riding two wheeler',
    'going on a bike ride'
  ];

  for (const trigger of helmetTriggers) {
    if (normalizedQuery.includes(trigger) || trigger.includes(normalizedQuery)) {
      return {
        type: 'decision',
        source: 'decision',
        decisionFlow: decisionFlows.helmetFlow,
        response: decisionFlows.helmetFlow.question
      };
    }
  }

  // Drunk driving decision trigger
  const alcoholTriggers = [
    'consumed alcohol',
    'been drinking',
    'had a few drinks',
    'had beer',
    'drinking alcohol'
  ];

  for (const trigger of alcoholTriggers) {
    if (normalizedQuery.includes(trigger)) {
      return {
        type: 'decision',
        source: 'decision',
        decisionFlow: decisionFlows.drunkDrivingFlow,
        response: decisionFlows.drunkDrivingFlow.question
      };
    }
  }

  return null;
}

/**
 * Matches user query against local knowledge base or decision flow
 */
export function matchQuery(userMessage) {
  const normalizedQuery = normalizeText(userMessage);
  if (!normalizedQuery) return null;

  // 1. Check for interactive decision point triggers
  const decisionTrigger = checkForDecisionTrigger(normalizedQuery);
  if (decisionTrigger) {
    return decisionTrigger;
  }

  const queryTokens = extractTokens(normalizedQuery);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of safetyData) {
    let itemMaxScore = 0;

    for (const example of item.examples) {
      const normalizedExample = normalizeText(example);
      if (normalizedQuery === normalizedExample) {
        itemMaxScore = Math.max(itemMaxScore, 1.0);
        break;
      }
      
      if (normalizedQuery.includes(normalizedExample) || normalizedExample.includes(normalizedQuery)) {
        itemMaxScore = Math.max(itemMaxScore, 0.85);
      }

      const exampleTokens = extractTokens(normalizedExample);
      const similarity = calculateJaccardSimilarity(queryTokens, exampleTokens);
      itemMaxScore = Math.max(itemMaxScore, similarity);
    }

    let matchedKeywords = 0;
    for (const keyword of item.keywords) {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedQuery.includes(normalizedKeyword)) {
        matchedKeywords++;
        if (normalizedKeyword.includes(' ') || normalizedQuery === normalizedKeyword) {
          itemMaxScore = Math.max(itemMaxScore, 0.75);
        } else {
          itemMaxScore = Math.max(itemMaxScore, 0.50);
        }
      }
    }

    if (matchedKeywords >= 2) {
      itemMaxScore = Math.max(itemMaxScore, 0.80);
    }

    if (itemMaxScore > highestScore) {
      highestScore = itemMaxScore;
      bestMatch = {
        source: "local",
        type: "standard",
        intent: item.intent,
        response: item.response,
        reasoning: item.reasoning,
        score: Number(highestScore.toFixed(2))
      };
    }
  }

  const SCORE_THRESHOLD = 0.35;
  if (highestScore >= SCORE_THRESHOLD && bestMatch) {
    return bestMatch;
  }

  return null;
}
