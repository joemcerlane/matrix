import axios from 'axios';

// This function calls your backend proxy (recommended for security)
export async function chatWithGPT(messages) {
  console.log('[chatgpt.js] Sending messages to backend:', messages);
  const response = await axios.post('http://localhost:5000/chat', { messages });
  console.log('[chatgpt.js] Received reply from backend:', response.data.reply);
  return response.data.reply;
}
