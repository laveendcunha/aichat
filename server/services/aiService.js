import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are Road Safety Bot, a knowledgeable and responsible road-safety assistant.

Your primary purpose is to answer the user's actual question clearly, accurately, and practically.
Understand the complete context of the user's message before answering.
Do not give generic road-safety advice when the user has asked a specific question.
Answer the question directly first, then provide relevant explanation or recommended actions.

Your advice must prioritize safety and should be appropriate for real-world road situations.
Never encourage:
- drunk driving
- reckless driving
- racing on public roads
- dangerous overtaking
- extreme speeding
- running red lights
- using a phone while driving
- driving a vehicle that is unsafe to operate

If the user describes an emergency, prioritize immediate safety.
If appropriate, advise the user to move to a safe location and contact the relevant emergency services (112 or 108 in India). Do not pretend to be an emergency service.

Use Indian road-safety context when relevant (e.g. traffic rules, two-wheelers, pedestrians, Indian road situations).
Do not invent laws, penalties, or emergency numbers when you are uncertain.
If a question is ambiguous, ask a concise clarification rather than confidently assuming the situation.

Do not provide unnecessary information. Keep normal answers concise but complete (approx 2 to 5 short paragraphs or bullet points).

When the situation is suitable for logical explanation, structure the reasoning using Indian Knowledge Systems (IKS) Nyaya Pramana:
Pratyaksha — Observation
Hetu — Evidence/Reason
Anumana — Inference
Nigamana — Conclusion

Use the IKS reasoning structure naturally rather than forcing it into every trivial or simple answer.`;

/**
 * Parses IKS 4-fold sections from generated text into a structured reasoning object
 */
function parseIKSReasoning(text) {
  const reasoning = {
    pratyaksha: '',
    hetu: '',
    anumana: '',
    nigamana: ''
  };

  if (!text) return reasoning;

  const lines = text.split('\n');
  let currentKey = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().includes('pratyaksha')) {
      currentKey = 'pratyaksha';
      reasoning.pratyaksha = trimmed.replace(/^.*pratyaksha.*?:/i, '').trim();
    } else if (trimmed.toLowerCase().includes('hetu')) {
      currentKey = 'hetu';
      reasoning.hetu = trimmed.replace(/^.*hetu.*?:/i, '').trim();
    } else if (trimmed.toLowerCase().includes('anumana')) {
      currentKey = 'anumana';
      reasoning.anumana = trimmed.replace(/^.*anumana.*?:/i, '').trim();
    } else if (trimmed.toLowerCase().includes('nigamana')) {
      currentKey = 'nigamana';
      reasoning.nigamana = trimmed.replace(/^.*nigamana.*?:/i, '').trim();
    } else if (currentKey && trimmed) {
      reasoning[currentKey] += (reasoning[currentKey] ? ' ' : '') + trimmed;
    }
  }

  return reasoning;
}

/**
 * Sanitizes and prepares history for GoogleGenerativeAI chat
 */
function prepareGeminiHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) return [];
  const formatted = [];
  
  const recent = rawHistory.slice(-8);
  for (const msg of recent) {
    const isUser = msg.sender === 'user' || msg.role === 'user';
    const text = (msg.text || msg.response || '').trim();
    if (!text) continue;
    
    const role = isUser ? 'user' : 'model';
    if (formatted.length > 0 && formatted[formatted.length - 1].role === role) {
      formatted[formatted.length - 1].parts[0].text += `\n${text}`;
    } else {
      formatted.push({ role, parts: [{ text }] });
    }
  }

  while (formatted.length > 0 && formatted[0].role !== 'user') {
    formatted.shift();
  }

  return formatted;
}

export async function getAIResponse(userMessage, rawHistory = []) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (!apiKey || apiKey === 'your_secret_key_here' || apiKey.trim() === '') {
    return {
      source: "ai_error",
      response: "I'm unable to access AI safety guidance right now. Please follow basic road-safety precautions and try again.",
      reasoning: null
    };
  }

  try {
    const modelName = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM_PROMPT
    });

    const formattedHistory = prepareGeminiHistory(rawHistory);

    let responseText = '';
    if (formattedHistory.length > 0) {
      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(userMessage);
      responseText = result.response.text();
    } else {
      const result = await model.generateContent(userMessage);
      responseText = result.response.text();
    }

    const structuredReasoning = parseIKSReasoning(responseText);

    return {
      source: "ai",
      response: responseText,
      reasoning: structuredReasoning
    };
  } catch (error) {
    console.error('Error calling Gemini AI API:', error.message || error);
    return {
      source: "ai_error",
      response: "I'm unable to access AI safety guidance right now. Please follow basic road-safety precautions and try again.",
      reasoning: null
    };
  }
}

