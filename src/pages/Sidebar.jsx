import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {" "}
      <h2 className="text-2xl font-bold mb-6">DIARY</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Quick Note
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Journal
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Notes
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              To-Do
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Calendar
            </a>
          </li>
          <li className="mt-4">
            <hr />
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Favourites
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Journal - April
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Finances
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Home tasks
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Books to read
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 hover:bg-gray-200 rounded">
              Travel list
            </a>
          </li>
          <li className="mt-4">
            <hr />
          </li>
          <li>
            <button className="w-full p-2 text-left hover:bg-gray-200 rounded">
              New Note
            </button>
          </li>
          <li>
            <button className="w-full p-2 text-left hover:bg-gray-200 rounded">
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
