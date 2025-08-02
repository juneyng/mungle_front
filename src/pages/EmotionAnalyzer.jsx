import React, { useState } from "react";
import axios from "axios";
import "./EmotionAnalyzer.css";

const EmotionAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [stats, setStats] = useState({});
  const [dailyStats, setDailyStats] = useState({});

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("/api/analyze", { text });
      setResult(response.data);
      fetchHistory();
      fetchStats();
      fetchDailyStats(); // 날짜별 통계 갱신
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
      const response = await axios.get("/api/history", {
        withCredentials: false,
      });
      setHistory(response.data);
    } catch (error) {
      console.error(
        "Error fetching history:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/stats", {
        withCredentials: false,
      });
      setStats(response.data);
    } catch (error) {
      console.error(
        "Error fetching stats:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchDailyStats = async () => {
    try {
      const response = await axios.get("/api/daily-stats", {
        withCredentials: false,
      });
      setDailyStats(response.data);
    } catch (error) {
      console.error(
        "Error fetching daily stats:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteHistory = async (id) => {
    try {
      await axios.delete(`/api/history/${id}`);
      fetchHistory();
      fetchStats();
      fetchDailyStats(); // 날짜별 통계 갱신
    } catch (error) {
      console.error(
        "Error deleting history:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const filteredAndSortedHistory = history
    .filter((record) =>
      record.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

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
      <h2>감정 통계</h2>
      <div className="stats-container">
        {Object.entries(stats).length > 0 ? (
          <div>
            <pre>{JSON.stringify(stats, null, 2)}</pre>
          </div>
        ) : (
          <p>통계 데이터가 없습니다.</p>
        )}
      </div>
      <h2>날짜별 캘린더 통계</h2>
      <div className="calendar-container">
        {Object.entries(dailyStats).length > 0 ? (
          Object.entries(dailyStats).map(([date, emotions]) => (
            <div key={date} className="calendar-day">
              <h3>{new Date(date).toLocaleDateString()}</h3>
              <ul>
                {Object.entries(emotions).map(([emotion, count]) => (
                  <li key={emotion}>
                    {emotion}: {count}회
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>날짜별 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default EmotionAnalyzer;
