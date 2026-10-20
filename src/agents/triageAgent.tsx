import React, { useState } from 'react';

interface TriageResult {
  issueType: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  summary: string;
}

export const TriageAgent: React.FC = () => {
  const [errorLog, setErrorLog] = useState<string>('');
  const [result, setResult] = useState<TriageResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const analyzeError = async () => {
    setLoading(true);
    // TODO: Connect your AI API call here
    // Simulating API response:
    setTimeout(() => {
      setResult({
        issueType: 'Runtime Error (NullPointerException)',
        severity: 'High',
        summary: 'The application crashes when attempting to read property of undefined on line 42.',
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-6 bg-lemon-800 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">🚨 Triage Agent</h2>
      <textarea
        className="w-full p-2 bg-lemon-950 border border-lemon-700 rounded text-sm mb-4"
        rows={5}
        placeholder="Paste your error logs or terminal output here..."
        value={errorLog}
        onChange={(e) => setErrorLog(e.target.value)}
      />
      <button
        onClick={analyzeError}
        disabled={loading || !errorLog}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 rounded font-semibold transition"
      >
        {loading ? 'Analyzing Log...' : 'Categorize & Triage'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-lemon-900 border-l-4 border-red-500 rounded">
          <p><strong>Type:</strong> {result.issueType}</p>
          <p><strong>Severity:</strong> <span className="text-red-400">{result.severity}</span></p>
          <p className="mt-2 text-lemon-300">{result.summary}</p>
        </div>
      )}
    </div>
  );
};
