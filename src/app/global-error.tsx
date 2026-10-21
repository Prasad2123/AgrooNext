'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#070D1E', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ maxWidth: '480px', width: '90%', padding: '32px', backgroundColor: '#0D1B2A', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', borderRadius: '12px', backgroundColor: '#00897B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>
            A
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', color: '#ffffff' }}>
            System Encountered an Error
          </h1>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94a3b8', marginBottom: '24px' }}>
            The AgrooNext application experienced an unexpected root error. You can attempt to reload the application.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              style={{ padding: '10px 20px', backgroundColor: '#00897B', color: '#ffffff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{ padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#f8fafc', textDecoration: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', display: 'inline-block' }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
