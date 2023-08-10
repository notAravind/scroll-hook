import { useEffect, useState, useTransition } from "react";
import "./transitionExample.css";
import TextWithColors from "./textWithColors";
const colors: Array<string> = ["red", "blue", "green", "black", "yellow"];

const getRandomIdx = () => {
  return Math.floor(Math.random() * colors.length);
};

const TransitionExample = () => {
  const [inpValue, setInpValue] = useState("");

  const [isPending, startTransition] = useTransition();

  const [colorsForLetters, setColorsForLetters] = useState<Array<string>>([]);
  useEffect(() => {
    startTransition(() => {
      const newArray: Array<string> = [];
      for (let i = 0; i < inpValue.length; i++) {
        newArray.push(colors[getRandomIdx()]);
      }
      setColorsForLetters(newArray);
    });
  }, [inpValue]);
  return (
    <div className="rowBox">
      <div>
        <textarea
          value={inpValue}
          onChange={(e) => setInpValue(e.currentTarget.value)}
        />
      </div>
      <div>
        <div>
          {isPending ? (
            <div>Loading Colors</div>
          ) : (
            <TextWithColors
              textValue={inpValue}
              colorsForLetters={colorsForLetters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransitionExample;
