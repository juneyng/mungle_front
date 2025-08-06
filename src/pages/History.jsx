import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([
    {
      id: 1,
      text: "오늘 정말 행복한 하루였어요!",
      emotion: "기쁨",
      confidence: 0.89,
      timestamp: "2024-01-15T10:30:00Z",
      message: "긍정적인 감정이 느껴집니다.",
    },
    {
      id: 2,
      text: "회사에서 스트레스를 많이 받았네요",
      emotion: "스트레스",
      confidence: 0.75,
      timestamp: "2024-01-14T16:45:00Z",
      message: "휴식이 필요해 보입니다.",
    },
    {
      id: 3,
      text: "친구들과 함께한 시간이 즐거웠어요",
      emotion: "기쁨",
      confidence: 0.82,
      timestamp: "2024-01-13T19:20:00Z",
      message: "사회적 연결감을 느끼고 있습니다.",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const navigate = useNavigate();

  const filteredAndSortedHistory = history
    .filter((record) =>
      record.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp)
    );

  const deleteRecord = (id) => {
    setHistory(history.filter((record) => record.id !== id));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      기쁨: "emotion-joy",
      슬픔: "emotion-sad",
      분노: "emotion-anger",
      스트레스: "emotion-stress",
      중립: "emotion-neutral",
    };
    return colors[emotion] || "emotion-neutral";
  };

  return (
    <div className="history-container">
      <header className="page-header">
        <h1 className="page-title">히스토리</h1>
        <div className="header-controls">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="control-btn">📑</button>
          <button className="control-btn">🔔</button>
          <button className="control-btn">🔗</button>
        </div>
      </header>

      <div className="summary-grid">
        <div className="card summary-card">
          <h2 className="card-title">최근 노트</h2>
          <div className="summary-list">
            <div className="summary-item">
              <span className="summary-icon">📝</span>
              <span className="summary-text">Journal - April</span>
            </div>
            <div className="summary-item">
              <span className="summary-icon">💭</span>
              <span className="summary-text">Mental health check</span>
            </div>
            <div className="summary-item">
              <span className="summary-icon">🏃‍♂️</span>
              <span className="summary-text">Workout log</span>
            </div>
          </div>
        </div>

        <div className="card upcoming-card">
          <h2 className="card-title">예정된 일정</h2>
          <div className="upcoming-list">
            <div className="upcoming-item">
              <span className="upcoming-date">Oct 31</span>
              <span className="upcoming-event">Halloween party 🎃</span>
            </div>
            <div className="upcoming-item">
              <span className="upcoming-date">Nov 12</span>
              <span className="upcoming-event">Birthday party 🎂</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card history-main-card">
        <div className="history-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="텍스트 검색..."
            className="search-input search-input--large"
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

        <div className="history-stats">
          <div className="stat-item">
            <span className="stat-number">{history.length}</span>
            <span className="stat-label">총 기록</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {filteredAndSortedHistory.length}
            </span>
            <span className="stat-label">검색 결과</span>
          </div>
        </div>

        <div className="history-list">
          {filteredAndSortedHistory.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <p className="empty-text">검색 결과가 없습니다.</p>
            </div>
          ) : (
            filteredAndSortedHistory.map((record) => (
              <div key={record.id} className="history-item">
                <div className="history-content">
                  <div className="history-text">{record.text}</div>
                  <div className="history-meta">
                    <span
                      className={`emotion-tag ${getEmotionColor(
                        record.emotion
                      )}`}
                    >
                      {record.emotion}
                    </span>
                    <span className="confidence-badge">
                      신뢰도: {record.confidence.toFixed(3)}
                    </span>
                    <span className="timestamp">
                      {formatDate(record.timestamp)}
                    </span>
                  </div>
                  <div className="history-message">{record.message}</div>
                </div>
                <button
                  onClick={() => deleteRecord(record.id)}
                  className="delete-btn"
                  aria-label="기록 삭제"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="btn btn--primary back-btn"
      >
        새로운 분석하기
      </button>
    </div>
  );
};

export default History;
