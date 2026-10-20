import { useState } from "react";
import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";

export default function App() {
  const [words, setWords] = useState([]);
  const [screen, setScreen] = useState("AllWords");

  function switchScreen() {
    setScreen((current) => (current === "AllWords" ? "AddWord" : "AllWords"));
  }

  if (screen === "AllWords") {
    return (
      <AllWords words={words} switchScreen={switchScreen} setWords={setWords} />
    );
  }

  return <AddWord switchScreen={switchScreen} setWords={setWords} />;
}
