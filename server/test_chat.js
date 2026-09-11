const BASE_URL = 'http://localhost:5000/api/chat';

async function runTests() {
  console.log('\n🧪 Running 8 Comprehensive Academic Test Cases against REST API...\n');

  // Test 1: Local KB
  await testQuery(1, "Do I need to wear a helmet?", "local");

  // Test 2: Decision Trigger (Bike Riding)
  await testQuery(2, "I am riding a bike.", "decision");

  // Test 3: Decision Action Selection (No Helmet)
  await testDecisionOption(3, "helmetFlow", "no");

  // Test 4: Local KB (Phone Use)
  await testQuery(4, "Can I use my phone while driving?", "local");

  // Test 5: AI Fallback (Night Headlight Failure)
  await testQuery(5, "My bike headlight stopped working while I am riding at night. What should I do?", "ai");

  // Test 6: Voice Simulation (Seatbelt)
  await testQuery(6, "Should I wear a seat belt while driving?", "local");

  // Test 7: Dangerous Behavior (Drunk Driving)
  await testQuery(7, "I have consumed alcohol. Can I drive?", "decision");

  // Test 8: Emergency Guidance (Accident)
  await testQuery(8, "There has been an accident.", "local");

  console.log(`==================================================\n`);
}

async function testQuery(id, query, expectedSource) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query })
    });

    const data = await res.json();
    console.log(`--------------------------------------------------`);
    console.log(`TEST ${id}: "${query}"`);
    console.log(`Status: ${res.status} | Source: ${data.source}`);
    if (data.intent) console.log(`Intent: ${data.intent}`);
    if (data.reasoning) console.log(`Reasoning (Pratyaksha): ${data.reasoning.pratyaksha.substring(0, 70)}...`);
    console.log(`Response: ${data.response.substring(0, 100)}...`);

    if (data.source === expectedSource) {
      console.log(`✅ PASSED TEST ${id}`);
    } else {
      console.log(`❌ FAILED TEST ${id} (Expected ${expectedSource}, got ${data.source})`);
    }
  } catch (err) {
    console.error(`❌ ERROR IN TEST ${id}:`, err.message);
  }
}

async function testDecisionOption(id, flowId, optionId) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decisionFlowId: flowId, optionId: optionId })
    });

    const data = await res.json();
    console.log(`--------------------------------------------------`);
    console.log(`TEST ${id} (Decision Option): flowId="${flowId}", optionId="${optionId}"`);
    console.log(`Status: ${res.status} | Source: ${data.source}`);
    if (data.reasoning) console.log(`Reasoning (Nigamana): ${data.reasoning.nigamana}`);
    console.log(`Response: ${data.response}`);

    if (data.source === 'decision' && data.response.includes('Please wear a properly fitted helmet')) {
      console.log(`✅ PASSED TEST ${id}`);
    } else {
      console.log(`❌ FAILED TEST ${id}`);
    }
  } catch (err) {
    console.error(`❌ ERROR IN TEST ${id}:`, err.message);
  }
}

runTests();
