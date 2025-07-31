import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmotionAnalyzer.css";

const EmotionAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("/api/analyze", { text });
      setResult(response.data);
      fetchHistory(); // 갱신
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

  const fetchHistory = async () => {
    try {
      console.log("Fetching history from:", "/api/history");
      const response = await axios.get("/api/history", {
        withCredentials: false,
      });
      console.log("History response:", response.data);
      setHistory(response.data);
    } catch (error) {
      console.error(
        "Error fetching history:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
      <h2>히스토리</h2>
      <ul className="history-list">
        {history.map((record) => (
          <li key={record.id}>
            {record.text} - {record.emotion} (신뢰도:{" "}
            {record.confidence.toFixed(3)}) -{" "}
            {new Date(record.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionAnalyzer;
