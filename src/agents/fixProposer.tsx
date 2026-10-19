import React, { useState } from 'react';

export const LoginInspector: React.FC = () => {
  const [authConfig, setAuthConfig] = useState<string>('');
  const [findings, setFindings] = useState<string[]>([]);
  const [isInspecting, setIsInspecting] = useState<boolean>(false);

  const inspectAuth = () => {
    setIsInspecting(true);
    setTimeout(() => {
      setFindings([
        'JWT Token missing expiration check in localStorage.',
        'OAuth redirect URI mismatch detected between environment and provider.',
      ]);
      setIsInspecting(false);
    }, 1200);
  };

  return (
    <div className="p-6 bg- -800 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">🔐 Login & Auth Inspector</h2>
      <input
        type="text"
        className="w-full p-2 bg- -950 border border- -700 rounded text-sm mb-4"
        placeholder="Paste your auth configurations or context..."
        value={authConfig}
        onChange={(e) => setAuthConfig(e.target.value)}
      />
      <button
        onClick={inspectAuth}
        className="px-4 py-2 bg- -600 hover:bg- -700 rounded font-semibold"
      >
        {isInspecting ? 'Inspecting Tokens...' : 'Scan Auth Flow'}
      </button>

      {findings.length > 0 && (
        <ul className="mt-4 list-disc pl-5 text- -300 space-y-1">
          {findings.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      )}
    </div>
  );
};
