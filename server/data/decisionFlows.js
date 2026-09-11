export const decisionFlows = {
  helmetFlow: {
    id: "helmetFlow",
    intent: "helmet",
    question: "🏍️ Before continuing, are you wearing a helmet?",
    options: [
      { id: "yes", label: "✓ YES, I AM", value: "yes" },
      { id: "no", label: "✕ NO, I'M NOT", value: "no" }
    ],
    responses: {
      yes: {
        response: "Good choice! Continue wearing your properly fitted helmet and follow traffic rules and speed limits.",
        source: "decision",
        reasoning: {
          pratyaksha: "User confirmed wearing a helmet while riding a two-wheeler.",
          hetu: "Headwear complies with safety regulations and reduces impact forces.",
          anumana: "Helmet compliance dramatically lowers head injury severity in sudden stops or crashes.",
          nigamana: "Maintain secure helmet strap alignment and keep driving defensively."
        }
      },
      no: {
        response: "⚠️ Please wear a properly fitted helmet before continuing your ride. Riding without a helmet is extremely dangerous and illegal.",
        source: "decision",
        reasoning: {
          pratyaksha: "User is riding or planning to ride a two-wheeler without a helmet.",
          hetu: "Absence of head protection leaves the cranium directly exposed to asphalt impact and vehicle collision energy.",
          anumana: "Riding unhelmeted creates fatal safety risks and guarantees heavy motor vehicle penalties.",
          nigamana: "Immediately halt your ride until an ISI/DOT certified helmet is acquired and securely worn."
        }
      }
    }
  },
  drunkDrivingFlow: {
    id: "drunkDrivingFlow",
    intent: "drunk_driving",
    question: "🍺 Have you consumed alcohol or any intoxicating substance?",
    options: [
      { id: "yes", label: "✓ YES", value: "yes" },
      { id: "no", label: "✕ NO", value: "no" }
    ],
    responses: {
      yes: {
        response: "🚫 Do NOT drive under any circumstances! Use a safe alternative such as a taxi, rideshare, designated driver, or public transportation.",
        source: "decision",
        reasoning: {
          pratyaksha: "User has consumed alcohol and is considering operating a vehicle.",
          hetu: "Alcohol depresses central nervous system function, impairing reaction time, depth perception, and motor control.",
          anumana: "Operating a vehicle post-consumption inevitably results in catastrophic accidents, loss of life, or severe legal imprisonment.",
          nigamana: "Hand over vehicle keys immediately and secure safe alternative transport."
        }
      },
      no: {
        response: "Good. Continue driving responsibly, remain alert, and strictly adhere to traffic rules.",
        source: "decision",
        reasoning: {
          pratyaksha: "User confirmed zero alcohol consumption before driving.",
          hetu: "Unimpaired neurological function ensures normal reaction time and decision-making.",
          anumana: "Sober driving minimizes preventable collision risks.",
          nigamana: "Proceed on your journey while staying vigilant of surrounding traffic."
        }
      }
    }
  }
};
