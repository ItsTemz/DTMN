import React, { useState } from "react";

function TurnTableOptions({
  speedChanged,
  durationChanged,
  soundToggled,
  propDefaults,
}) {
  const [speedVal, setSpeedVal] = useState("1");
  const [durationVal, setDurationVal] = useState("1");
  const [soundOn, setSoundOn] = useState(false);

  const onSpeedChange = (e) => {
    setSpeedVal(e.target.value / 10);
    speedChanged(e.target.value * 100);
  };
  const onDurationChange = (e) => {
    setDurationVal(e.target.value / 10);
    durationChanged(e.target.value * 100);
  };
  const onSoundToggle = (e) => {
    setSoundOn(!soundOn);
    soundToggled(!soundOn);
  };

  return (
    <div className="navbar bg-base-100 rounded-full">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Options</a>
      </div>
      <div className="flex-none">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text px-5">Sound</span>
            <input
              type="checkbox"
              className="toggle"
              onChange={onSoundToggle}
            />
          </label>
        </div>
        <div>
          <label className="label">
            <span className="label-text">
              Speed: <span className="font-bold">{speedVal}</span>
            </span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            className="range range-sm z-50"
            onChange={onSpeedChange}
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">
              Duration: <span className="font-bold">{durationVal}</span> sec
            </span>
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            className="range range-sm z-50"
            onChange={onDurationChange}
          />
        </div>
      </div>
    </div>
  );
}

export default TurnTableOptions;
