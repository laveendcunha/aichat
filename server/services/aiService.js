import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are Road Safety Bot, an AI safety assistant created for an Indian Knowledge Systems (IKS) academic experiment.

STRICT SAFETY MANDATES:
1. Drunk Driving: Strictly forbid driving under the influence of alcohol or drugs under any circumstances.
2. Speeding & Racing: Strongly discourage excessive speed or racing on public roads. Never provide racing or high-speed bypass advice.
3. Phone Use: Instruct drivers to stop in a safe shoulder/parking space before operating any mobile device.
4. Traffic Signals: Never encourage running red lights or jumping amber signals.
5. Emergencies: Prioritize 1) Immediate personal safety, 2) Moving out of active traffic, 3) Calling emergency services (112 / 108 in India), and 4) Avoiding unnecessary secondary risk.

STRUCTURED IKS REASONING MANDATE:
You MUST structure your reasoning strictly into the 4-fold Nyaya Pramana framework:
- Pratyaksha (Observation): Direct physical observation of the user's scenario.
- Hetu (Evidence / Reason): Causal physics, law, or physiological reason.
- Anumana (Inference): Logical deduction of safety risks and consequences.
- Nigamana (Conclusion): Direct, unambiguous safety action or instruction.

Format your response clearly as:
Pratyaksha: [Observation]
Hetu: [Evidence/Reason]
Anumana: [Inference]
Nigamana: [Conclusion]`;

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

export async function getAIResponse(userMessage) {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey || apiKey === 'your_secret_key_here' || apiKey.trim() === '') {
    return generateOfflineIKSResponse(userMessage);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });

    const result = await model.generateContent(userMessage);
    const responseText = result.response.text();
    const structuredReasoning = parseIKSReasoning(responseText);

    return {
      source: "ai",
      response: responseText,
      reasoning: structuredReasoning
    };
  } catch (error) {
    console.error('Error calling Gemini AI API:', error.message);
    return generateOfflineIKSResponse(userMessage, error.message);
  }
}

function generateOfflineIKSResponse(userMessage, errDetail = null) {
  const lowerMsg = userMessage.toLowerCase();

  let pratyaksha = `Observation of user query: "${userMessage.trim()}".`;
  let hetu = "Vehicle dynamics, road friction, and legal mandates dictate road user safety.";
  let anumana = "Deviating from defensive driving protocols exponentially increases collision risks.";
  let nigamana = "Always prioritize defensive driving, observe posted speed limits, and keep emergency contact numbers (112) accessible.";

  if (lowerMsg.includes('headlight') || lowerMsg.includes('light') || lowerMsg.includes('night')) {
    pratyaksha = "Vehicle headlight failure occurring during night riding/driving.";
    hetu = "Absence of illumination drastically reduces forward sight lines and renders the vehicle invisible to oncoming traffic.";
    anumana = "Continuing to ride in darkness creates extreme risk of collision with unlit obstacles or vehicles.";
    nigamana = "Immediately pull off to a safe shoulder, turn on parking/hazard lights, and seek assistance or await daybreak.";
  } else if (lowerMsg.includes('accident') || lowerMsg.includes('crash')) {
    pratyaksha = "Occurrence or involvement in a vehicular road crash.";
    hetu = "Unsecured crash scenes risk secondary multi-vehicle collisions and delayed medical intervention.";
    anumana = "Immediate scene marking and emergency service activation prevents further fatalities during the golden hour.";
    nigamana = "Move away from active traffic lanes, call emergency services (112 or 108) immediately, and deploy warning triangles.";
  } else if (lowerMsg.includes('racing') || lowerMsg.includes('speed')) {
    pratyaksha = "Inquiry regarding high-speed maneuvers or public road racing.";
    hetu = "Kinetic energy increases with velocity squared ($E_k = \\frac{1}{2}mv^2$), rendering emergency braking ineffective.";
    anumana = "Public road racing results in fatal collisions, vehicle destruction, and criminal prosecution.";
    nigamana = "Never engage in street racing. Obey designated speed limits at all times.";
  }

  const formattedResponse = `Pratyaksha (Observation): ${pratyaksha}\n\nHetu (Evidence / Reason): ${hetu}\n\nAnumana (Inference): ${anumana}\n\nNigamana (Conclusion): ${nigamana}`;

  return {
    source: "ai",
    response: formattedResponse,
    reasoning: {
      pratyaksha,
      hetu,
      anumana,
      nigamana
    },
    isOfflineNotice: errDetail ? `AI fallback running in offline mode (${errDetail}).` : null
  };
}
