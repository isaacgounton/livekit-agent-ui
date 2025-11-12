# Accessing the Embed Agents in the Frontend

Now that the merge is complete, here's where you can interact with the different embed agents:

## 🎯 Quick Access URLs

### 1. **Main Agent UI** (Full-Featured)

```
http://localhost:3000
```

- Full voice chat with video streaming
- Screen sharing support
- Real-time transcription
- Chat input
- Best for: Full-featured agent interactions

**Access:** Click "Start call" button

---

### 2. **Popup Embed Test Page**

```
http://localhost:3000/test/popup
```

- Look for the **floating button in the bottom-right corner**
- Click to open/close the popup widget
- Lightweight embed widget
- Shadow DOM isolated
- Best for: Testing the embed widget before deploying to production

**How it works:**

1. Navigate to `http://localhost:3000/test/popup`
2. Look for the **blue circular button** in the bottom-right corner
3. Click it to open the chat popup
4. Start chatting with the agent

---

### 3. **Iframe Embed Page**

```
http://localhost:3000/(iframe)/embed?theme=dark
```

- Inline embedded chat interface
- Compact horizontal bar design
- Perfect for embedding in iframes or other websites
- Supports query parameters:
  - `?theme=dark` - Dark theme
  - `?theme=light` - Light theme
  - `?theme=system` - System preference (default)

**How it works:**

1. Navigate to `http://localhost:3000/(iframe)/embed`
2. You'll see a compact chat bar at the top
3. Click "Chat with Agent" to start
4. Full chat experience in a compact interface

---

## 📋 Feature Comparison

| Feature         | Main UI | Popup | Iframe |
| --------------- | ------- | ----- | ------ |
| Voice Chat      | ✅      | ✅    | ✅     |
| Video Streaming | ✅      | ✅    | ❌     |
| Screen Share    | ✅      | ✅    | ❌     |
| Chat Input      | ✅      | ✅    | ✅     |
| Floating Widget | ❌      | ✅    | ❌     |
| Compact Design  | ❌      | ✅    | ✅     |
| Embeddable      | ❌      | ✅    | ✅     |

---

## 🚀 Development Workflow

### Start the Frontend

```bash
cd /media/etugrand/DATA/DEV.ai/Agents/livekit-agent/livekit-agent-ui
pnpm install
pnpm dev
```

Then open one of the URLs above.

### Build for Production

```bash
# Builds Next.js + webpack popup embed
pnpm build

# Or just the embed popup script
pnpm build-embed-popup-script
```

The embed popup script will be generated at: `public/embed-popup.js`

---

## 🔧 Technical Details

### Popup Embed Script

- **Built by:** Webpack
- **Entry point:** `components/embed-popup/standalone-bundle-root.tsx`
- **Output:** `public/embed-popup.js`
- **Size:** Optimized production bundle
- **Isolation:** Shadow DOM for CSS encapsulation

**How to use in production:**

```html
<!-- Add this to any website -->
<script
  src="https://your-domain.com/public/embed-popup.js"
  data-lk-sandbox-id="your-sandbox-id"
></script>
```

### Iframe Embed

- **Route:** `/(iframe)/embed`
- **Entry point:** `components/embed-iframe/agent-client.tsx`
- **Responsive:** Works on mobile and desktop
- **Themeable:** Supports dark/light/system themes

**How to use in production:**

```html
<!-- Embed as an iframe -->
<iframe
  src="https://your-domain.com/(iframe)/embed?theme=dark"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>
```

---

## 🧪 Testing Checklist

### Main UI Testing

- [ ] Navigate to `http://localhost:3000`
- [ ] Click "Start call"
- [ ] Speak to the agent
- [ ] Enable camera (if available)
- [ ] Try screen sharing
- [ ] Test chat input
- [ ] Close and reopen

### Popup Embed Testing

- [ ] Navigate to `http://localhost:3000/test/popup`
- [ ] See floating button in bottom-right
- [ ] Click to open popup
- [ ] Test voice chat
- [ ] Test chat messages
- [ ] Close and reopen
- [ ] Check for CSS isolation (no conflicts with page styles)

### Iframe Embed Testing

- [ ] Navigate to `http://localhost:3000/(iframe)/embed`
- [ ] See compact chat bar
- [ ] Click "Chat with Agent"
- [ ] Test voice chat
- [ ] Test chat messages
- [ ] Test theme switching (`?theme=light`, `?theme=dark`)

---

## 🎨 Customization

### Change Agent Name

Edit `app-config.ts`:

```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  agentName: 'your-agent-name', // Change this
  // ... other config
};
```

### Customize Branding

Edit `app-config.ts`:

```typescript
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Your Company',
  pageTitle: 'Your Agent Title',
  logo: '/your-logo.svg',
  accent: '#your-color',
  // ... other config
};
```

### Add More Agents

Create new route groups like:

- `/agents/voice-assistant` → Main voice UI
- `/agents/document-qa` → Document Q&A embed
- `/agents/translator` → Translation embed

---

## 📞 Connection Issues?

If you can't connect to the agent:

1. **Check backend is running:**

   ```bash
   cd /media/etugrand/DATA/DEV.ai/Agents/livekit-agent
   uv run main
   ```

2. **Check environment variables:**
   - `LIVEKIT_API_KEY` set in `.env`
   - `LIVEKIT_API_SECRET` set in `.env`
   - `LIVEKIT_URL` set in `.env`

3. **Check browser console for errors:**
   - Open DevTools (F12)
   - Look for network/connection errors

4. **Check API endpoint:**
   - Frontend needs to reach `/api/connection-details`
   - Check that the endpoint is responding

---

## 📚 File Structure

```
livekit-agent-ui/
├── app/
│   ├── (app)/                    # Main agent UI
│   │   ├── page.tsx              # Main page
│   │   └── layout.tsx            # Main layout
│   ├── (iframe)/                 # Iframe embed routes
│   │   ├── layout.tsx            # Iframe layout
│   │   └── embed/
│   │       └── page.tsx          # Embed page
│   ├── test/
│   │   └── page.tsx              # Popup embed test
│   └── api/connection-details/   # Token generation
├── components/
│   ├── embed-popup/              # Popup widget components
│   ├── embed-iframe/             # Iframe embed components
│   ├── app/                      # Main app components
│   └── livekit/                  # Shared components
└── public/
    └── embed-popup.js            # Built by webpack
```

---

## 🎓 Next Steps

1. **Verify everything works:**
   - Start frontend: `cd livekit-agent-ui && pnpm dev`
   - Start backend: `cd .. && uv run main`
   - Visit: `http://localhost:3000`

2. **Test all three interfaces:**
   - Main UI: `/`
   - Popup embed: `/test/popup`
   - Iframe embed: `/(iframe)/embed`

3. **Build for production:**
   - Run: `pnpm build`
   - Deploy to your hosting

4. **Customize for your use case:**
   - Edit `app-config.ts`
   - Modify components as needed
   - Add more agent types

---

Happy building! 🚀
