// Real AI integration using OpenRouter API
export const InvokeLLM = async (messages, options = {}) => {
  try {
    const requestBody = {
      model: 'qwen/qwen3-235b-a22b-2507:free',
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      extra_headers: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "ChatMind Pro"
      },
      extra_body: {}
    };
    
    console.log('Request Body:', requestBody); // Debug log
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ChatMind Pro'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data); // Debug log
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid API response format');
    }
    
    const aiResponse = data.choices[0].message.content;
    console.log('AI Response:', aiResponse); // Debug log

    // Ensure we return a string, not an object
    return {
      content: String(aiResponse),
      role: 'assistant',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    
    // Fallback to mock responses if API fails
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage?.content || "";
    
    const responses = {
      hello: "Hello! How can I help you today?",
      help: "I'm here to help! What would you like to know?",
      weather: "I can't check the weather, but I can help with other questions!",
      code: "I'd be happy to help with coding questions. What programming language are you working with?",
      default: "That's an interesting question! I'm here to help with any information you need."
    };
    
    const userInputLower = userInput.toLowerCase();
    let response = responses.default;
    
    if (userInputLower.includes('hello') || userInputLower.includes('hi')) {
      response = responses.hello;
    } else if (userInputLower.includes('help')) {
      response = responses.help;
    } else if (userInputLower.includes('weather')) {
      response = responses.weather;
    } else if (userInputLower.includes('code') || userInputLower.includes('programming')) {
      response = responses.code;
    }
    
    return {
      content: response,
      role: 'assistant',
      timestamp: new Date().toISOString()
    };
  }
}; 