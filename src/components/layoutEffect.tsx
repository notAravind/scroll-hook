import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const LayouEffectExample = () => {
  const bgRef = useRef(null);
  const [state, setState] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useLayoutEffect(() => {
    if (bgRef.current) bgRef.current.style.width = state;

    setShowBtn(state > 100);
  }, [state]);

  // useEffect(() => {
  //   if (bgRef.current) bgRef.current.style.width = state;

  //   setShowBtn(state > 100);
  // }, [state]);
  // useLayoutEffect(() => {
  //   console.log("Use Layout Triggered");

  //   setState("Loaded");
  // }, []);
  // useEffect(() => {
  //   console.log("Use Effect Triggered");
  //   setState("Loaded");
  // }, []);

  return (
    <div ref={bgRef}>
      <input
        value={state}
        type="number"
        onChange={(e) => setState(e.currentTarget.value)}
      />
      {showBtn && <button>Hello</button>}
    </div>
  );
};

export default LayouEffectExample;
