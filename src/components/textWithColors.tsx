import { useEffect, useState, useTransition } from "react";

type TextWithColorsProps = {
  colorsForLetters: Array<string>;
  textValue: string;
};
const TextWithColors = ({
  colorsForLetters,
  textValue,
}: TextWithColorsProps) => {
  const [isPending, startTransition] = useTransition();
  const [comps, setComps] = useState<Array<JSX.Element>>([]);
  useEffect(() => {
    startTransition(() => {
      const tempComps: Array<JSX.Element> = [];
      textValue.split("").map((letter, i) =>
        tempComps.push(
          <span key={i} style={{ color: colorsForLetters[i] }}>
            {letter}
          </span>
        )
      );
      setComps(tempComps);
    });
  }, []);
  return isPending ? <div>Building Colors</div> : comps;
};

export default TextWithColors;
