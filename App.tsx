import React, { Suspense, lazy } from 'react';

// Replace standard imports with these:
const TriageAgent = lazy(() => import('./TriageAgent'));
const FixProposer = lazy(() => import('./FixProposer'));

function App() {
  return (
    <div>
      <Suspense fallback={<div className="text-white text-center">Loading Agent...</div>}>
        <TriageAgent />
      </Suspense>
    </div>
  );
}
