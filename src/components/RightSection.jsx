import { useState } from "react";
import rightimg from "../assets/right.png";
import heightmeter from "../assets/hmeter.png";

import "../style/RightSectionStyle.css"

function RightSection() {
  //-------------- states--- for right building -------------

  const [clicked, setClicked] = useState(false);
  const [rightImgTop, setRightImgTop] = useState(382);
  const [startY, setStartY] = useState(0);
  const [meter, setMeter] = useState({
    top: 480,
    height: 389,
  });

  const [mtop, setMTop] = useState(650);

  const [heightCount, setHeightCount] = useState(15);

  //------------- handlers for right building ---------------------

  const handleBuildingClick = (event) => {
    event.stopPropagation();
    setClicked(!clicked);
    setStartY(event.clientY);
    console.log(event.clientY);
  };

  const handleMove = (event) => {
    if (clicked) {
      const diffY = event.clientY - startY;
      const newTop = rightImgTop + diffY;

      if (newTop >= 100 && newTop <= 700) {
        setRightImgTop(newTop);
        setMeter((prev) => ({
          ...prev,
          ["top"]: newTop + 100,
          ["height"]: 769 - newTop,
        }));
        setStartY(event.clientY);
        setHeightCount(Math.round((meter.height*(15/389))))
        setMTop((prev)=> prev+(diffY*0.5))
      }
    }
  };

  return (
    <div className="right-container" onMouseMove={handleMove}>
      <div className="height-meter-container">
        <div
          className="height-counter"
          style={{
            top: `${mtop}px`,
          }}
        >
          <p>{heightCount}m</p>
        </div>
        <img
          src={heightmeter}
          alt="height-meter"
          style={{
            top: `${meter.top}px`,
            height: `${meter.height}px`,
          }}
        />
      </div>
      <img
        className="right-building"
        src={rightimg}
        alt="building"
        onClick={handleBuildingClick}
        style={{
          top: `${rightImgTop}px`,
        }}
      />
    </div>
  );
}

export default RightSection;
