import { useEffect, useState, useRef } from "react";
import ObservableElement from "./ObservableElement";
// import MoviesData from "../data/movies.json";

const colors: Array<string> = ["red", "blue", "green", "black", "yellow"];

const getRandomIdx = () => {
  return Math.floor(Math.random() * colors.length);
};

const ScrollComponent = () => {
  const intersectionObserver = useRef<IntersectionObserver>();
  const [currElements, setCurrElements] = useState<Array<string>>([]);

  useEffect(() => {
    const tempArr = [];
    for (let i = 0; i < 9; i++) {
      tempArr.push(colors[getRandomIdx()]);
    }

    let currScrollY = window.scrollY;

    let skip = 0;

    const skipElement = new Set();
    const elementHeightInPixel = (window.innerHeight / 100) * 20;
    console.log(elementHeightInPixel);
    intersectionObserver.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const goingUp = window.scrollY < currScrollY ? true : false;

        console.log();
        if (skip < entries.length) {
          skip += entries.length;
          return;
        }

        const nonIntersectedEle = [];

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            const id = Number.parseInt(entry.target.id);

            if (skipElement.has(id)) {
              console.log(id);

              skipElement.delete(id);
              continue;
            }
            nonIntersectedEle.push(entry);
          }
        }
        // if (nonIntersectedEle.length == 0) {
        //   window.scrollBy({ top: 0 });
        // }

        setCurrElements((prev) => {
          if (goingUp) {
            prev.splice(
              prev.length - nonIntersectedEle.length,
              nonIntersectedEle.length
            );
            window.scrollBy({
              top: elementHeightInPixel * nonIntersectedEle.length,
              behavior: "auto",
            });

            for (let i = 0; i < nonIntersectedEle.length; i++) {
              skipElement.add(i);
            }
            return [
              ...Array.from({ length: nonIntersectedEle.length }).map(
                () => colors[getRandomIdx()]
              ),
              ...prev,
            ];
          } else {
            prev.splice(0, nonIntersectedEle.length);
            window.scrollBy({
              top: -(elementHeightInPixel * nonIntersectedEle.length),
              behavior: "auto",
            });

            for (
              let i = prev.length;
              i < prev.length + nonIntersectedEle.length;
              i++
            ) {
              skipElement.add(i);
            }
            return [
              ...prev,
              ...Array.from({ length: nonIntersectedEle.length }).map(
                () => colors[getRandomIdx()]
              ),
            ];
          }
        });
        console.log(goingUp ? "Goin Up" : "Goind Down");
        currScrollY = window.scrollY;
      }
    );
    setCurrElements(tempArr);
  }, []);

  return (
    <div>
      {currElements.map((color, i) => (
        <ObservableElement
          color={color}
          key={i}
          id={`${i}`}
          intersectionObserver={intersectionObserver.current}
        />
      ))}
    </div>
  );
};

export default ScrollComponent;
