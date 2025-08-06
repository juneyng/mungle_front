import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmotionAnalyzer.css";

const History = () => {
  const [history, setHistory] = useState([]);
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">히스토리</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded"
          />
          <button className="p-2 border rounded">📑</button>
          <button className="p-2 border rounded">🔔</button>
          <button className="p-2 border rounded">🔗</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">RECENT NOTES</h2>
          <p>Journal - April</p>
          <p>Mental health check</p>
          <p>Workout log</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">UPCOMING</h2>
          <p>Saturday, October 31 - Halloween party</p>
          <p>Thursday, November 12 - Birthday party</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="텍스트 검색..."
            className="p-2 border rounded flex-1"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="latest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
        </div>
        <ul className="space-y-2">
          {filteredAndSortedHistory.map((record) => (
            <li
              key={record.id}
              className="p-2 border rounded flex justify-between items-center"
            >
              <span>
                {record.text} - {record.emotion} (신뢰도:{" "}
                {record.confidence.toFixed(3)})
              </span>
              <button className="p-1 bg-red-500 text-white rounded hover:bg-red-600">
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
