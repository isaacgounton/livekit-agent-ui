import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { getAppConfig } from '@/lib/env';
import globalCss from '@/styles/globals.css';
import EmbedFixedAgentClient from './agent-client';

const scriptTag = document.querySelector<HTMLScriptElement>('script[data-lk-sandbox-id]');
const sandboxIdAttribute = scriptTag?.dataset.lkSandboxId;

console.log('LiveKit embed script loaded, scriptTag:', scriptTag, 'sandboxId:', sandboxIdAttribute);

if (sandboxIdAttribute) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'lk-embed-wrapper');
  // Add some debugging styles
  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  wrapper.style.pointerEvents = 'none';
  wrapper.style.zIndex = '9999';
  document.body.appendChild(wrapper);

  // For debugging, don't use shadow root
  // const shadowRoot = wrapper.attachShadow({ mode: 'open' });
  const container = wrapper;

  // Include all app styles into the container
  const styleTag = document.createElement('style');
  styleTag.textContent = globalCss;
  container.appendChild(styleTag);

  const reactRoot = document.createElement('div');
  container.appendChild(reactRoot);

  getAppConfig(window.location.origin, sandboxIdAttribute)
    .then((appConfig) => {
      const root = ReactDOM.createRoot(reactRoot);
      root.render(<EmbedFixedAgentClient appConfig={appConfig} />);
    })
    .catch((err) => {
      console.error('LiveKit popup embed error - Error loading app config:', err);
    });
} else {
  console.error(
    'LiveKit popup embed error - no data-lk-sandbox-id attribute found on script tag. This is required!'
  );
}
