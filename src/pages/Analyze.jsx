import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Analyze.css";

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
    <div className="analyze-container">
      <header className="page-header">
        <h1 className="page-title">감정 분석기</h1>
        <div className="header-controls">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="control-btn">📑</button>
          <button className="control-btn">🔔</button>
          <button className="control-btn">🔗</button>
        </div>
      </header>

      <div className="content-grid">
        <div className="card todo-card">
          <h2 className="card-title">TODAY</h2>
          <div className="todo-list">
            <label className="todo-item">
              <input type="checkbox" className="todo-checkbox" />
              <span className="todo-text">Team meeting at 13:30</span>
            </label>
            <label className="todo-item">
              <input type="checkbox" className="todo-checkbox" />
              <span className="todo-text">Go to David's place</span>
            </label>
            <label className="todo-item">
              <input type="checkbox" className="todo-checkbox" />
              <span className="todo-text">Pay kitty kibble</span>
            </label>
            <label className="todo-item">
              <input type="checkbox" className="todo-checkbox" />
              <span className="todo-text">Pay bills</span>
            </label>
          </div>
        </div>

        <div className="card analyze-card">
          <h2 className="card-title">분석 입력</h2>
          <div className="analyze-form">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="마음 속에 있는 말들을 적어봐요..."
              className="emotion-input"
              rows="4"
            />
            <button
              onClick={analyzeEmotion}
              className="btn btn--primary analyze-btn"
              disabled={!text.trim()}
            >
              분석하기
            </button>
          </div>
        </div>
      </div>

      {result && (
        <div className="card result-card">
          <h2 className="card-title">분석 결과</h2>
          <div className="result-content">
            <div className="result-item">
              <span className="result-label">감정:</span>
              <span className="result-value emotion-value">
                {result.emotion}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">신뢰도:</span>
              <span className="result-value confidence-value">
                {result.confidence.toFixed(3)}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">메시지:</span>
              <p className="result-message">{result.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyze;
