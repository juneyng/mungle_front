import React, { useState } from "react";
import axios from "axios";
import "./EmotionAnalyzer.css";

const EmotionAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/analyze", {
        text,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing emotion:", error);
      setResult({
        emotion: "중립",
        message: "오류가 발생했어요. 다시 시도해 주세요.",
        confidence: 0.0,
      });
    }
  };

  return (
    <div className="analyzer-container">
      <h1>감정 분석기</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 텍스트를 입력하세요..."
        className="text-input"
      />
      <button onClick={analyzeEmotion} className="analyze-button">
        분석하기
      </button>
      {result && (
        <div className="result-container">
          <h2>결과</h2>
          <p>감정: {result.emotion}</p>
          <p>신뢰도: {result.confidence.toFixed(3)}</p>
          <p>메시지: {result.message}</p>
        </div>
      )}
    </div>
  );
};

export default EmotionAnalyzer;
