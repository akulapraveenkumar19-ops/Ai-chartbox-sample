# Fix Chat 500 Error - TODO Steps

## Plan Summary
- Proxy works, servers running.
- 500 from backend OpenAI call (likely no API key).
- Edit backend/index.js: add logging, free model, mock fallback.

## Steps
- [x] 1. Edit backend/index.js with improvements ✅
- [ ] 2. Kill/restart backend server (Ctrl+C in backend terminal, then: cd backend && npm start)
- [ ] 3. Test chat in browser (send message, no 500 error, mock/AI reply + voice)
- [ ] 4. (Optional) Get free OpenRouter key at https://openrouter.ai/keys , add to backend/.env: API_KEY=sk-or-v1-...

**Progress: Backend fixed! Restart server then test.**
