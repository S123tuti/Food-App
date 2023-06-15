import { useContext } from "react";
import { ThemeContext } from "../../App";
import "./style.css";

export default function ToggleTheme() {
  const { setTheme, theme } = useContext(ThemeContext);
  console.log(setTheme);

  return (
    <button
      className="toggle-theme"
      style={theme ? { backgroundColor: "#12343b" } : {}}
      onClick={() => setTheme(!theme)}
    >
      Change Theme
    </button>
  );
}