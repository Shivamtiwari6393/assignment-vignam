import "./App.css";

import LeftSection from "./components/LeftSection";
import MiddleSection from "./components/MiddleSection";
import RightSection from "./components/RightSection";

function App() {
  return (
    <div className="app-container">
      <LeftSection></LeftSection>
      <MiddleSection></MiddleSection>
      <RightSection></RightSection>
    </div>
  );
}

export default App;
