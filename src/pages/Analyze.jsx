import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동용
import "./EmotionAnalyzer.css";

const Analyze = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("/api/analyze", { text });
      setResult(response.data);
      // 분석 후 히스토리로 이동 (선택 사항)
      navigate("/history");
    } catch (error) {
      console.error(
        "Error analyzing emotion:",
        error.response ? error.response.data : error.message
      );
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
        placeholder="마음 속에 있는 말들을 적어봐요"
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

export default Analyze;
