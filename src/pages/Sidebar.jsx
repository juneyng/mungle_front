import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">멍글멍글</h2>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Quick Note
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Journal
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Notes
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              To-Do
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Calendar
            </a>
          </li>
          <li className="nav-divider">
            <hr className="divider-line" />
          </li>
          <li className="nav-section-title">Favourites</li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Journal - April
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Finances
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Home tasks
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Books to read
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Travel list
            </a>
          </li>
          <li className="nav-divider">
            <hr className="divider-line" />
          </li>
          <li className="nav-item">
            <button className="nav-button nav-button--primary">New Note</button>
          </li>
          <li className="nav-item">
            <button className="nav-button nav-button--secondary">
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
