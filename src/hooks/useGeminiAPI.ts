
export const useGeminiAPI = () => {
  const callGeminiAPI = async (payload: any) => {
    const apiKey = ""; // Provided by environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response:", errorBody);
      throw new Error(`Errore API: ${response.statusText}`);
    }
    return response.json();
  };

  return { callGeminiAPI };
};
