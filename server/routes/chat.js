import express from 'express';
import { matchQuery } from '../services/matchingService.js';
import { getAIResponse } from '../services/aiService.js';
import { decisionFlows } from '../data/decisionFlows.js';

const router = express.Router();

/**
 * POST /api/chat
 * Accepts:
 *   { "message": "..." }
 *   OR
 *   { "decisionFlowId": "helmetFlow", "optionId": "yes" }
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, decisionFlowId, optionId } = req.body;

    // Handle Decision Option Selection
    if (decisionFlowId && optionId) {
      const flow = decisionFlows[decisionFlowId];
      if (flow && flow.responses && flow.responses[optionId]) {
        const optionData = flow.responses[optionId];
        return res.json({
          source: "decision",
          intent: flow.intent,
          response: optionData.response,
          reasoning: optionData.reasoning
        });
      }
    }

    // Validate empty or missing message input
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Please enter a road-safety question.'
      });
    }

    const trimmedMessage = message.trim();

    // 1. Search Local Knowledge Base & Decision Triggers
    const localMatch = matchQuery(trimmedMessage);

    if (localMatch) {
      if (localMatch.type === 'decision') {
        return res.json({
          source: "decision",
          type: "decision",
          decisionFlow: localMatch.decisionFlow,
          response: localMatch.response
        });
      }

      return res.json({
        source: localMatch.source,
        intent: localMatch.intent,
        response: localMatch.response,
        reasoning: localMatch.reasoning
      });
    }

    // 2. If NO local match found -> Execute AI Fallback Service
    const aiResult = await getAIResponse(trimmedMessage);

    return res.json({
      source: aiResult.source,
      response: aiResult.response,
      reasoning: aiResult.reasoning,
      ...(aiResult.isOfflineNotice ? { notice: aiResult.isOfflineNotice } : {})
    });

  } catch (error) {
    console.error('Error in /api/chat route:', error);
    return res.status(500).json({
      error: 'Unable to process your request at this time. Please try again.'
    });
  }
});

export default router;
