'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getSandboxId } from '@/lib/env';

export default function TestPage() {
  const [sandboxId, setSandboxId] = useState('');

  useEffect(() => {
    setSandboxId(getSandboxId(window.location.origin));
  }, []);

  return (
    <>
      {sandboxId && <Script src="/embed-popup.js" data-lk-sandbox-id={sandboxId} />}
      <div className="min-h-screen bg-white p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold">LiveKit Embed Popup Test</h1>

          <div className="mb-8 rounded-lg bg-blue-50 p-6">
            <h2 className="mb-2 text-lg font-semibold text-blue-900">Instructions</h2>
            <p className="mb-4 text-blue-800">
              Look for the <strong>floating button in the bottom right corner</strong> of your
              screen. Click it to open the chat widget.
            </p>
            <p className="text-blue-800">
              The embed script is loaded in the page footer and creates a popup widget that you can
              interact with independently.
            </p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-2xl font-bold">Test Content</h2>
              <p className="mb-4 text-gray-700">
                This is a test page to verify the popup embed functionality. The embed widget should
                appear as a floating button in the bottom right corner.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold">Features to Test</h2>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Click the floating button to open/close the popup</li>
                <li>✓ Start a voice conversation with the agent</li>
                <li>✓ Send and receive chat messages</li>
                <li>✓ Enable/disable microphone</li>
                <li>✓ View connection status</li>
                <li>✓ Error handling for connection failures</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-bold">Implementation Details</h2>
              <div className="rounded-lg bg-gray-100 p-4 font-mono text-sm">
                <p className="text-gray-700">
                  Script source: <code className="font-bold">/public/embed-popup.js</code>
                </p>
                <p className="text-gray-700">
                  Built by: <code className="font-bold">webpack</code>
                </p>
                <p className="text-gray-700">
                  Entry point:{' '}
                  <code className="font-bold">
                    components/embed-popup/standalone-bundle-root.tsx
                  </code>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
