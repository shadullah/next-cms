import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="my-36 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Dashboard
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <li>
            <Link
              href="/dashboard/card"
              className="block text-center p-6 border-2 border-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors"
            >
              Add Card Section
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/feedback"
              className="block text-center p-6 border-2 border-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors"
            >
              Feedback Section
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/text"
              className="block text-center p-6 border-2 border-gray-700 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors"
            >
              Text Section
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
