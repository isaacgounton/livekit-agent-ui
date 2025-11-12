# Unified LiveKit Agent UI - Merge Summary

## Overview

This document describes the successful merge of `livekit-embed` into `livekit-agent-ui`, creating a **unified multi-agent UI framework** that supports both:

- **Full-featured Agent Interface** - Rich voice interaction with video, screen sharing, and chat
- **Popup Embed** - Lightweight JavaScript snippet for embedding agents on external websites
- **Iframe Embed** - Embedded chat bar for web integration
- **Future Agent Types** - Extensible architecture for adding more agent types

## What Was Merged

### 1. **Package Configuration** ✅

- Updated `package.json` with all dependencies from `livekit-embed`
- Added webpack build pipeline for `embed-popup.js` generation
- New build script: `pnpm build-embed-popup-script`
- Main build now includes: `pnpm build` (builds both Next.js app and embed popup)

### 2. **Components Merged** ✅

#### Embed Popup Components (`components/embed-popup/`)

- `standalone-bundle-root.tsx` - Entry point for webpack-bundled popup script
- `agent-client.tsx` - Popup client connection management
- `popup-view.tsx` - Popup UI with video, audio visualizer, and chat
- `action-bar.tsx` - Control bar with mic, camera, screen share, and chat
- `audio-visualizer.tsx` - Real-time audio visualization
- `error-message.tsx` - Error display component
- `microphone-toggle.tsx` - Microphone toggle with device selection
- `transcript.tsx` - Chat message display with auto-scroll
- `trigger.tsx` - Popup trigger button with agent status

#### Embed Iframe Components (`components/embed-iframe/`)

- `agent-client.tsx` - Iframe client connection management
- `welcome-view.tsx` - Welcome state before connection
- `session-view.tsx` - Active session with controls
- `theme-provider.tsx` - Theme script injection for iframe isolation

### 3. **Hooks Integrated** ✅

#### New Hooks (`hooks/`)

- `use-agent-control-bar.ts` - Unified control bar state management
- `use-chat-and-transcription.ts` - Chat and transcription message merging
- `use-connection-details.ts` - Connection token generation and refresh
- `use-publish-permissions.ts` - Permission checking for media publishing
- `useDelayedValue.ts` - Debounced value state hook

### 4. **Configuration & Types** ✅

#### New Files

- `lib/types.ts` - Unified types for both UIs
  - `AppConfig` - Configuration interface (merged from both versions)
  - `EmbedErrorDetails` - Error display type
  - `CombinedTranscription` - Transcription type
  - `ThemeMode` - Theme type

- `lib/env.ts` - Environment and configuration utilities
  - `getAppConfig()` - Load config from endpoints
  - `getSandboxId()` - Extract sandbox ID
  - Theme constants

#### Updated Files

- `lib/utils.ts` - Added `transcriptionToChatMessage()` helper
- `app-config.ts` - Unified configuration defaults
- `webpack.config.js` - Webpack bundler for popup embed
- `tsconfig.webpack.json` - TypeScript config for webpack builds

### 5. **Build Configuration** ✅

- `webpack.config.js` - Production build config for `embed-popup.js`
- `tsconfig.webpack.json` - Separate TypeScript config for webpack
- Updated build scripts in `package.json`

## Project Structure

```
livekit-agent-ui/
├── app/
│   ├── (app)/                          # Main agent UI routes
│   ├── (iframe)/                       # Iframe embed routes (NEW)
│   └── api/connection-details/         # Token generation
├── components/
│   ├── app/                            # Main app components
│   ├── embed-popup/                    # Popup embed components (NEW)
│   ├── embed-iframe/                   # Iframe embed components (NEW)
│   ├── livekit/                        # Shared LiveKit components
│   └── ui/                             # UI primitives
├── hooks/
│   ├── use-agent-control-bar.ts        # (NEW)
│   ├── use-chat-and-transcription.ts   # (NEW)
│   ├── use-connection-details.ts       # (NEW)
│   ├── use-publish-permissions.ts      # (NEW)
│   └── useDelayedValue.ts              # (NEW)
├── lib/
│   ├── types.ts                        # (NEW)
│   ├── env.ts                          # (NEW)
│   └── utils.ts                        # (UPDATED)
├── public/
│   └── embed-popup.js                  # Built by webpack (generated)
├── webpack.config.js                   # (NEW)
├── tsconfig.webpack.json               # (NEW)
└── package.json                        # (UPDATED)
```

## Routes & URLs

### Main Agent UI (from livekit-agent-ui)

- `/` or `/(app)/` - Full-featured agent interface
- `http://localhost:3000`

### Embed Routes (from livekit-embed)

- `/(iframe)/embed` - Inline embed page
- `/test/popup` - Popup embed test page
- Can be embedded via script tag or iframe

## Environment Variables

```bash
# Existing variables
LIVEKIT_API_KEY=your_key
LIVEKIT_API_SECRET=your_secret
LIVEKIT_URL=https://your-server
NEXT_PUBLIC_APP_CONFIG_ENDPOINT=/api/config  # Optional

# For embeddings
NEXT_PUBLIC_CONN_DETAILS_ENDPOINT=/api/connection-details
```

## Building

### Development

```bash
pnpm install
pnpm dev
```

Access:

- Main UI: `http://localhost:3000`
- Embed test: `http://localhost:3000/test/popup`

### Production Build

```bash
pnpm build
```

This command will:

1. Build the Next.js application
2. Generate `embed-popup.js` via webpack
3. Output to `.next/` and `public/embed-popup.js`

### Embed Popup Build Only

```bash
pnpm build-embed-popup-script
```

## Future Extensibility

The unified structure supports adding more agent types:

### Option 1: Route-based Multi-Agent

```
/agents/[agent-type]/
  ├── voice-assistant/
  ├── document-qa/
  └── translator/
```

### Option 2: Configuration-based Agent Selection

- Query parameter: `?agentType=voice-assistant`
- Or environment variable: `AGENT_TYPE=voice-assistant`
- Configuration in `app-config.ts`

### Adding New Agent Features

1. Add components to `components/agents/`
2. Create new hook if needed in `hooks/`
3. Add configuration to `app-config.ts`
4. Update routes if needed in `app/`

## Key Files to Review

- `app-config.ts` - Central configuration
- `lib/types.ts` - Unified type definitions
- `lib/env.ts` - Configuration loading
- `webpack.config.js` - Popup build config
- `package.json` - Dependencies and scripts

## Migration from Separate Projects

### What Changed

- One unified project instead of two separate directories
- Shared dependencies and build pipeline
- Single deployment target
- Consolidated configuration

### What Stayed the Same

- All component logic and functionality
- Routing structure and URLs
- Environment variable handling
- API endpoints

## Testing Checklist

- [ ] Main agent UI loads at `/`
- [ ] Popup embed works at `/test/popup`
- [ ] Iframe embed works at `/(iframe)/embed`
- [ ] `pnpm build` completes without errors
- [ ] `pnpm build-embed-popup-script` generates `public/embed-popup.js`
- [ ] All TypeScript types check out
- [ ] Agent connection works
- [ ] Chat functionality works
- [ ] Video/screen share works (in main UI)
- [ ] Theme switching works
- [ ] Responsive design works on mobile

## Known Limitations & Future Improvements

1. **Component Duplication**
   - Some components (e.g., controls) exist in slightly different forms
   - Could be further refactored into shared components

2. **Type Safety**
   - Some TypeScript `// @ts-expect-error` comments exist
   - Could be improved with better type definitions

3. **Testing**
   - Consider adding unit tests for hooks
   - Add E2E tests for embed functionality

4. **Documentation**
   - Add inline JSDoc comments
   - Create component storybook
   - Add debugging guide

## Support & Questions

Refer to:

- Original livekit-agent-ui README
- Original livekit-embed README
- LiveKit documentation: <https://docs.livekit.io>
