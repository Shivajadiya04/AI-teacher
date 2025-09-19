// frontend/src/components/AttemptsTable.jsx
import React from 'react';

const AttemptsTable = ({ attempts = [] }) => {
  return (
    <div className="bg-white dark:bg-gray-500 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Recent Test Attempts</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b dark:border-gray-800">
              <th className="py-2 pr-4">Test</th>
              <th className="py-2 pr-4">Score</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map(a => {
              const dt = new Date(a.takenAt);
              return (
                <tr key={a._id} className="border-b last:border-0 dark:border-gray-800">
                  <td className="py-2 pr-4">{a.testName}</td>
                  <td className="py-2 pr-4 font-medium">{a.score}</td>
                  <td className="py-2 pr-4">{a.total}</td>
                  <td className="py-2 pr-4">{dt.toLocaleDateString()}</td>
                  <td className="py-2 pr-4">{dt.toLocaleTimeString()}</td>
                </tr>
              );
            })}
            {attempts.length === 0 && (
              <tr>
                <td className="py-3 text-gray-500" colSpan={5}>No attempts yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttemptsTable;
