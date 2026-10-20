import React, { useState } from 'react';

export const Summarizer: React.FC = () => {
  const [stackTrace, setStackTrace] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  const handleSummarize = () => {
    setSummary('In plain terms: Your code is trying to connect to a local database server, but the database service isn\'t running on your machine right now.');
  };

  return (
    <div className="p-6 bg-lemon-800 rounded-lg shadow-md text- ">
      <h2 className="text-xl font-bold mb-4">📝 Log Summarizer</h2>
      <button 
        onClick={handleSummarize}
        className="px-4 py-2 bg-lemon-600 hover:bg-brass-700 rounded font-semibold mb-4"
      >
        Simplify Log
      </button>
      {summary && <p className="p-3 bg-lemon-900 text-brass-300 rounded border border- -800">{summary}</p>}
    </div>
  );
};

