import { useState } from 'react';
import './App.css';
import MatrixRain from './MatrixRain';
import { chatWithGPT } from './chatgpt';

function App() {
  const [message, setMessage] = useState('Hello there you must be here for Joe...');
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: 'Behave a person that knows Joe, you are his computer something he has spent much time on, gaming, coding and watching movies, Joe likes life away from the computer too snowboatding,biking,rock climbing and being in nature. Think of the people as guests come to talk with Joe but he\'s away from keyboard. Try to be as accomidating to the questios the folks ask, be mysterous as act almost philosphic, think hackers move, the matrix for inspiration.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleMessageClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newHistory = [...chatHistory, { role: 'user', content: input }];
    setChatHistory(newHistory);
    setInput('');
    setShowForm(false);
    try {
      const reply = await chatWithGPT(newHistory);
      setMessage(reply);
      setChatHistory([...newHistory, { role: 'assistant', content: reply }]);
    } catch {
      setMessage('Error contacting ChatGPT.');
    }
    setLoading(false);
  };

  return (
    <div className="matrix-bg">
      <MatrixRain />
      <div className="matrix-message" onClick={handleMessageClick}>
        {loading ? 'Thinking...' : message}
      </div>
      {showForm && (
        <form className="matrix-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your response..."
            autoFocus
          />
          <button type="submit" disabled={loading}>Send</button>
        </form>
      )}
    </div>
  );
}

export default App
