import middleimg from "../assets/middle.png";

import { useState } from "react";

import teacher from "../assets/teacher.png";

import hand from "../assets/hand.png";

import target from "../assets/target.png";

import camera from "../assets/camera.png";

import clickImgButton from "../assets/click_img_button.png";

import widthMeter from "../assets/wmeter.png";

import line2 from "../assets/line2.png";

import mainCamera from "../assets/main_camera.png";

import student from "../assets/student.png";


import "../style/MiddleSectionStyle.css"

function MiddleSection() {
  //------------------ statesfor teacher----------------------

  const [drag, setDrag] = useState(false);
  const [middleImgLeft, setMiddleImgLeft] = useState(500);
  const [startX, setStartX] = useState(0);

  //------------- states for hand rotation------------------

  const [handRotation, setHandRotation] = useState(1);

  const [scale, setScale] = useState(2.2);

  const [angleCounter, setAngleCounter] = useState(40);

  //  ------------- states for target-------------

  const [targetPosition, setTargetPosition] = useState({ x: 95, y: 10 });
  const [draggingTarget, setDraggingTarget] = useState(false);

  const [startPos, setStartPosition] = useState({ x: 0, y: 0 });

  // ------------  state for width-meter--------------------

  const [wCounter, setWcounter] = useState(300);
  const [mLeft, setMLeft] = useState(200);

  const [widthValue, setWidthValue] = useState(20);

  // ------------handle click on target----------------------

  const handleTargetClick = (event) => {
    setDraggingTarget(!draggingTarget);

    setStartPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  //------------ handle target movement-----------

  const handleTargetMove = (event) => {
    if (draggingTarget) {
      const diffX = event.clientX - startPos.x;
      const diffY = event.clientY - startPos.y;

      const newX = targetPosition.x + diffX;
      const newY = targetPosition.y + diffY;

      setTargetPosition({ x: newX, y: newY });

      setStartPosition({ x: event.clientX, y: event.clientY });

      // -----------  for rotation------------

      const perpendicular = 192 - newY;
      const base = newX - 50 + 101;

      const radian = Math.atan2(perpendicular, base);
      const degree = (radian * 180) / Math.PI;

      console.log("perpendicular = ", `155 - ${newY} = `, perpendicular);
      console.log("base= ", `${newX} - 50 = `, base);
      console.log(degree, "=degree");
      const finalAngle = 360 - degree + 52;

      setHandRotation(finalAngle);

      setAngleCounter((411 - Math.round(finalAngle) + 360) % 360);

      const distance = Math.sqrt(perpendicular ** 2 + base ** 2);
      setScale(distance / 100);
    }
  };

  //----------- handle click on teacher -----------

  const handleTeacherClick = (event) => {
    setDrag(!drag);
    setStartX(event.clientX);
  };

  //----------------- handle teacher movement-----------------

  const handleTeacherMove = (event) => {
    if (drag) {
      const diffX = event.clientX - startX;
      const newLeft = middleImgLeft + diffX;

      if (newLeft >= 100 && newLeft <= 500) {
        setMiddleImgLeft(newLeft);
        setWcounter((prev) => prev - diffX);
        setMLeft((prev) => prev - diffX * 0.5);
        setWidthValue(Math.round(wCounter * (1 / 15)));
      }

      setStartX(event.clientX);
    }
  };

  // -------------  handle onclick ------

  const handleOnClick = () => {};

  return (
    <div className="middle-container" onMouseMove={handleTargetMove}>
      <div className="camera-container">
        <img src={mainCamera} alt="camera" />

        <div className="student-container">
          <img src={student} alt="student" id="student" />
        </div>
      </div>

      <div
        className="teacher-container"
        style={{
          left: `${middleImgLeft}px`,
        }}
      >
        {/* angle-counter */}
        <div className="angle-counter">
          <p>{angleCounter}°</p>
        </div>

        {/* base */}

        <img src={line2} alt="horizontal_line" id="horizontal-line" />

        <div
          className="target-container"
          onClick={handleTargetClick}
          style={{
            position: "absolute",
            left: `${targetPosition.x}px`,
            top: `${targetPosition.y}px`,
          }}
        >
          {/* target  */}
          <img src={target} alt="target_png" />
        </div>

        {/* width-counter */}
        <div
          className="w-counter"
          style={{
            left: `${mLeft}px`,
          }}
        >
          <p>{`${widthValue}m`}</p>
        </div>

        {/* width-meter */}
        <img
          src={widthMeter}
          alt="wmeter"
          id="width-meter"
          style={{
            width: `${wCounter}px`,
          }}
        />

        {/* ---------click img--------------- */}

        <img
          src={clickImgButton}
          alt="button"
          id="img-button"
          onClick={handleOnClick}
        />

        <div
          className="hand-container"
          style={{
            rotate: `${handRotation}deg`,
          }}
        >
          {/* hypotenuse */}

          <div
            id="hypotenuse"
            style={{
              scale: `${scale}`,
            }}
          ></div>

          {/* camera */}
          <img src={camera} alt="camera_png" id="camera" />

          {/* hand */}
          <img src={hand} alt="hand png" />
        </div>

        {/* ---teacher img--- */}

        <img src={teacher} alt="teacher-img" id="teacher" />
      </div>
      <div className="middle-img-container">
        <img
          src={middleimg}
          alt="middle_structure"
          onMouseMove={handleTeacherMove}
          onClick={handleTeacherClick}
        />
      </div>
    </div>
  );
}

export default MiddleSection;
