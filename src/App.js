// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CollapsibleSection({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          fontSize: 16,
          fontWeight: 'bold',
          padding: 0,
          marginBottom: 6,
          color: '#5ed68a',
        }}
        aria-expanded={open}
      >
        {open ? '▼' : '▶'} {title}
      </button>
      {open && (
        <div
          style={{
            padding: 10,
            backgroundColor: '#636161',
            borderRadius: 4,
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: 14,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [inputType, setInputType] = useState('code'); // 'code' or 'url'
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      setError('Please enter some input.');
      return;
    }
    setLoading(true);
    setResult('');
    setError('');
    try {
      const prompt =
        inputType === 'code'
          ? `You are an expert software developer. Analyze the following code snippet for errors, bugs, or bad practices. Explain each issue clearly and provide corrected code examples.\n\n${inputValue}`
          : `You are a web performance and SEO expert. Analyze the website at this URL for common issues, accessibility problems, and performance bottlenecks. Provide detailed explanations and actionable recommendations.\n\nURL: ${inputValue}`;

      const response = await axios.post('http://localhost:4000/api/analyze', {
        prompt,
        model: 'gpt-4',
        max_tokens: 700,
      });

      setResult(response.data.result.trim());
    } catch (err) {
      setError('Failed to get AI response. Please try again later.');
    }
    setLoading(false);
  };

  // Simple heuristic to detect code blocks in AI response
  const extractCodeBlocks = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    const parts = [];
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'code', language: match[1] || 'text', content: match[2] });
      lastIndex = codeBlockRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }
    return parts;
  };

  const renderedResult = () => {
    if (!result) return null;
    const parts = extractCodeBlocks(result);
    return parts.map((part, idx) =>
      part.type === 'code' ? (
        <SyntaxHighlighter
          key={idx}
          language={part.language}
          style={coy}
          showLineNumbers
          wrapLongLines
        >
          {part.content}
        </SyntaxHighlighter>
      ) : (
        <p key={idx} style={{ whiteSpace: 'pre-wrap', marginBottom: 10 }}>
          {part.content}
        </p>
      )
    );
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: 'auto',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>AI Debugging Assistant</h1>

      <div style={{ marginBottom: 15, textAlign: 'center' }}>
        <label style={{ marginRight: 20 }}>
          <input
            type="radio"
            value="code"
            checked={inputType === 'code'}
            onChange={() => setInputType('code')}
          />{' '}
          Code Snippet
        </label>
        <label>
          <input
            type="radio"
            value="url"
            checked={inputType === 'url'}
            onChange={() => setInputType('url')}
          />{' '}
          Website URL
        </label>
      </div>

      {inputType === 'code' ? (
        <textarea
          rows={12}
          placeholder="Paste your code snippet here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: 14,
            padding: 12,
            borderRadius: 6,
            border: '1px solid #ccc',
            resize: 'vertical',
          }}
          spellCheck={false}
        />
      ) : (
        <input
          type="text"
          placeholder="Enter website URL here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            width: '100%',
            fontSize: 16,
            padding: 12,
            borderRadius: 6,
            border: '1px solid #ccc',
          }}
        />
      )}

      <div style={{ textAlign: 'center', marginTop: 15 }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '12px 30px',
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}            
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: 6,
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: 30,
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <CollapsibleSection title="AI Analysis Result">{renderedResult()}</CollapsibleSection>
        </div>
      )}
    </div>
  );
} 

       
