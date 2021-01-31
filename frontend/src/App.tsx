import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState<string | undefined | null | never>();

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000');
      setText(await res.text());
    })()
  }, []);

  return (
    <div className="App">
      {text && text}
    </div>
  );
}

export default App;
