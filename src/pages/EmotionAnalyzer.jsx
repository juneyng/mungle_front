import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmotionAnalyzer.css";

const EmotionAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest"); // 'latest' or 'oldest'

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

  const deleteHistory = async (id) => {
    try {
      await axios.delete(`/api/history/${id}`);
      fetchHistory(); // 삭제 후 갱신
    } catch (error) {
      console.error(
        "Error deleting history:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // 필터링 및 정렬된 히스토리 계산
  const filteredAndSortedHistory = history
    .filter((record) =>
      record.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

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
      <div className="filter-section">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="텍스트 검색..."
          className="text-input"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>
      <h2>히스토리</h2>
      <ul className="history-list">
        {filteredAndSortedHistory.map((record) => (
          <li key={record.id}>
            {record.text} - {record.emotion} (신뢰도:{" "}
            {record.confidence.toFixed(3)}) -{" "}
            {new Date(record.timestamp).toLocaleString()}
            <button
              onClick={() => deleteHistory(record.id)}
              className="delete-button"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmotionAnalyzer;
