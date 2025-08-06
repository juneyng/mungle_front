import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmotionAnalyzer.css";

const Analyze = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("/api/analyze", { text });
      setResult(response.data);
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
    <div>
      <div className="header">
        <h1>감정 분석기</h1>
        <div className="controls">
          <input type="text" placeholder="Search" />
          <button>📑</button>
          <button>🔔</button>
          <button>🔗</button>
        </div>
      </div>
      <div className="card">
        <h2>TODAY</h2>
        <div className="checkbox-list">
          <label>
            <input type="checkbox" /> Team meeting at 13:30
          </label>
          <label>
            <input type="checkbox" /> Go to David's place
          </label>
          <label>
            <input type="checkbox" /> Pay kitty kibble
          </label>
          <label>
            <input type="checkbox" /> Pay bills
          </label>
        </div>
        <p>분석 입력</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="마음 속에 있는 말들을 적어봐요"
          className="input-field"
        />
        <button onClick={analyzeEmotion} className="analyze-button">
          분석하기
        </button>
      </div>
      {result && (
        <div className="card result">
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
