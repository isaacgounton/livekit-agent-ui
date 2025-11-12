# Unified LiveKit Agent UI

This is a **unified multi-agent UI framework** combining the full-featured agent interface with web embed capabilities. It provides both a comprehensive voice agent interface and lightweight embedding options for integrating agents into external websites.

Built on [LiveKit Agents](https://docs.livekit.io/agents) and the [LiveKit JavaScript SDK](https://github.com/livekit/client-sdk-js). It supports [voice](https://docs.livekit.io/agents/start/voice-ai), [transcriptions](https://docs.livekit.io/agents/build/text/), and [virtual avatars](https://docs.livekit.io/agents/integrations/avatar).

Also available for:
[Android](https://github.com/livekit-examples/agent-starter-android) • [Flutter](https://github.com/livekit-examples/agent-starter-flutter) • [Swift](https://github.com/livekit-examples/agent-starter-swift) • [React Native](https://github.com/livekit-examples/agent-starter-react-native)

<picture>
  <source srcset="./.github/assets/readme-hero-dark.webp" media="(prefers-color-scheme: dark)">
  <source srcset="./.github/assets/readme-hero-light.webp" media="(prefers-color-scheme: light)">
  <img src="./.github/assets/readme-hero-light.webp" alt="App screenshot">
</picture>

### Features

#### Main Agent UI

- Real-time voice interaction with LiveKit Agents
- Camera video streaming support
- Screen sharing capabilities
- Audio visualization and level monitoring
- Virtual avatar integration
- Light/dark theme switching with system preference detection

#### Web Embed Capabilities

- **Popup Embed** - Floating widget for website integration
- **Iframe Embed** - Inline chat bar for websites
- Lightweight JavaScript bundle (`embed-popup.js`)
- Shadow DOM isolation for CSS encapsulation
- Customizable branding via configuration

#### General

- Customizable branding, colors, and UI text via configuration
- Multi-agent support ready
- Built with Next.js
- Extensible architecture for future agent types

### Project structure

```
livekit-agent-ui/
├── app/
│   ├── (app)/                    # Main agent UI routes
│   ├── (iframe)/                 # Iframe embed routes
│   ├── api/connection-details/   # Token generation
│   ├── layout.tsx
│   └── ...
├── components/
│   ├── app/                      # Main app components
│   ├── embed-popup/              # Popup embed components
│   ├── embed-iframe/             # Iframe embed components
│   ├── livekit/                  # Shared LiveKit components
│   ├── ui/                       # UI primitives
│   └── ...
├── hooks/
│   ├── use-agent-control-bar.ts
│   ├── use-chat-and-transcription.ts
│   ├── use-connection-details.ts
│   ├── use-publish-permissions.ts
│   └── ...
├── lib/
│   ├── types.ts                  # Unified types
│   ├── env.ts                    # Configuration loading
│   └── utils.ts
├── public/
│   ├── embed-popup.js            # Built by webpack
│   └── ...
├── webpack.config.js             # Popup embed build config
└── package.json
```

## Getting started

### Installation & Development

```bash
pnpm install
pnpm dev
```

Then open:

- **Main UI**: <http://localhost:3000>
- **Embed Test**: <http://localhost:3000/test/popup>
- **Iframe Embed**: <http://localhost:3000/(iframe)/embed>

### Production Build

```bash
# Builds both Next.js app and webpack popup embed
pnpm build

# Or just the embed popup script
pnpm build-embed-popup-script
```

### Using the Agent

You'll need an agent to connect to. Try our starter agent for:

- [Python](https://github.com/livekit-examples/agent-starter-python)
- [Node.js](https://github.com/livekit-examples/agent-starter-node)
- Or [create your own](https://docs.livekit.io/agents/start/voice-ai/)

## Configuration

Configure the application via `app-config.ts`:

#### Example: App configuration

```ts
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'LiveKit',
  pageTitle: 'LiveKit Voice Agent',
  pageDescription: 'A voice agent built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#002cf2',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
```

## Environment Variables

Configure in `.env.local` (copy from `.env.example` if available):

```bash
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=https://your-livekit-server-url

# Optional configuration endpoints
NEXT_PUBLIC_APP_CONFIG_ENDPOINT=/api/config
NEXT_PUBLIC_CONN_DETAILS_ENDPOINT=/api/connection-details
```

## Using the Embed

### Popup Embed (JavaScript Widget)

Add this to your website:

```html
<script src="https://your-domain.com/embed-popup.js" data-lk-sandbox-id="your-sandbox-id"></script>
```

The embed will appear as a floating button that opens a chat popup.

### Iframe Embed

Use the hosted iframe page:

```html
<iframe src="https://your-domain.com/(iframe)/embed?theme=dark" width="100%" height="100%"></iframe>
```

## Deployment

> [!TIP]
> Deploy easily with [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react).

[![Open on LiveKit](https://img.shields.io/badge/Open%20on%20LiveKit%20Cloud-002CF2?style=for-the-badge&logo=external-link)](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react)

Or deploy to your favorite platform (Vercel, Railway, etc.). Ensure environment variables are set.

## Advanced Usage

### Multiple Agents

This framework is designed to support multiple agent types. See `MERGE_SUMMARY.md` for extensibility patterns.

### Custom Components

- Modify components in `components/app/` for main UI
- Modify `components/embed-popup/` for popup embed
- Modify `components/embed-iframe/` for iframe embed

### Styling

- Main styling: `styles/globals.css`
- Tailwind CSS configured with custom variables
- Theme switching available via `components/app/theme-toggle`

## Getting started

> [!TIP]
> If you'd like to try this application without modification, you can deploy an instance in just a few clicks with [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react).

[![Open on LiveKit](https://img.shields.io/badge/Open%20on%20LiveKit%20Cloud-002CF2?style=for-the-badge&logo=external-link)](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react)

Run the following command to automatically clone this template.

```bash
lk app create --template agent-starter-react
```

Then run the app with:

```bash
pnpm install
pnpm dev
```

And open <http://localhost:3000> in your browser.

You'll also need an agent to speak with. Try our starter agent for [Python](https://github.com/livekit-examples/agent-starter-python), [Node.js](https://github.com/livekit-examples/agent-starter-node), or [create your own from scratch](https://docs.livekit.io/agents/start/voice-ai/).

## Configuration

This starter is designed to be flexible so you can adapt it to your specific agent use case. You can easily configure it to work with different types of inputs and outputs:

#### Example: App configuration (`app-config.ts`)

```ts
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'LiveKit',
  pageTitle: 'LiveKit Voice Agent',
  pageDescription: 'A voice agent built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#002cf2',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
```

You can update these values in [`app-config.ts`](./app-config.ts) to customize branding, features, and UI text for your deployment.

> [!NOTE]
> The `sandboxId` and `agentName` are for the LiveKit Cloud Sandbox environment.
> They are not used for local development.

#### Environment Variables

You'll also need to configure your LiveKit credentials in `.env.local` (copy `.env.example` if you don't have one):

```env
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=https://your-livekit-server-url
```

These are required for the voice agent functionality to work with your LiveKit project.

## Contributing

This template is open source and we welcome contributions! Please open a PR or issue through GitHub, and don't forget to join us in the [LiveKit Community Slack](https://livekit.io/join-slack)!
