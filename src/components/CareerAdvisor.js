import React, { useState } from "react";
import axios from "axios";
// Use relative imports

const CareerAdvisor = () => {
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/", new URLSearchParams({ query })); 
      setAdvice(response.data.advice); // Set JSON response in state
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-blue-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Career Advisor</h1>
      <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-md">
        <Textarea
          placeholder="Ask your career-related question here...(Ex. I want to become a Computer Engineer)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />

       <button 
          onClick={handleSubmit}  
          className="w-full h-12 mt-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center px-4"
        >
          {loading ? "Loading..." : "Get Advice"}
        </button>

      </div>

      {advice && (
        <div className="w-full max-w-2xl mt-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Advice</h2>
          {Object.entries(advice).map(([sentiment, responses]) => (
            <div key={sentiment} className="mb-4">
              <h3 className="text-xl font-medium text-blue-800 capitalize">{sentiment}</h3>
              {responses.map((response, index) => (
                <Card key={index} className="my-2 border-l-4 border-blue-500">
                  <div className="p-4">
                    <p className="text-gray-700">
                      <strong>Question:</strong> {response.question}
                    </p>
                    <p className="text-gray-800 mt-2">
                      <strong>Response:</strong> {response.response}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Similarity:</strong> {response.similarity}% | 
                      <strong> Career Stage:</strong> {response.career_stage} | 
                      <strong> Field:</strong> {response.field} | 
                      <strong> Sentiment:</strong> {response.sentiment}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerAdvisor;
