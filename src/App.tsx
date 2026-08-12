import { useEffect, useState } from "react";
import "./App.css";
import { CANVAS_ID, renderTextToCanvas } from "./canvas";

function App() {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    renderTextToCanvas(text);
  }, [text]);
  return (
    <article id="app">
      <textarea cols={10} onChange={(e) => setText(e.target.value)}></textarea>
      <canvas id={CANVAS_ID} width={1200} height={600}></canvas>
    </article>
  );
}

export default App;
