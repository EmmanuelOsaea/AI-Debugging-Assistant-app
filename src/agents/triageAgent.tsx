import React, { useState } from 'react';

export const FixProposer: React.FC = () => {
  const [proposedCode, setProposedCode] = useState<string>('');

  const generateFix = () => {
    setProposedCode(`// Proposed Fix:\nif (!user) {\n  return <Redirect to="/login" />;\n}`);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-lg shadow-md text- ">
      <h2 className="text-xl font-bold mb-4">💡 Fix Proposer Agent</h2>
      <button onClick={generateFix} className="px-4 py-2 bg--600 hover:bg--700 rounded font-semibold mb-4">
        Generate Resolution Code
      </button>
      {proposedCode && (
        <pre className="p-4 bg- rounded text--400 font-mono text-xs overflow-x-auto">
          <code>{proposedCode}</code>
        </pre>
      )}
    </div>
  );
};

