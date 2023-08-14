import { useEffect, useState, useRef } from "react";
import ObservableElement from "./ObservableElement";
import MoviesData from "../data/movies.json";

const colors: Array<string> = ["red", "blue", "green", "black", "yellow"];

const getRandomIdx = () => {
  return Math.floor(Math.random() * colors.length);
};

export type Movie = {
  id: number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
};

const ScrollComponent = () => {
  const intersectionObserver = useRef<IntersectionObserver>();
  const [currElements, setCurrElements] = useState<Array<Movie>>([]);

  useEffect(() => {
    const tempArr: Array<Movie> = [];
    for (let i = 0; i < 8; i++) {
      tempArr.push(MoviesData[i] as Movie);
    }

    let currScrollY = window.scrollY;

    let skip = 0;

    const skipElement = new Set();
    const elementHeightInPixel = (window.innerHeight / 100) * 25;
    intersectionObserver.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const goingUp = window.scrollY < currScrollY ? true : false;

        if (skip < entries.length) {
          skip += entries.length;
          return;
        }

        const nonIntersectedEle = [];

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            const elementID = Number.parseInt(entry.target.id);

            if (skipElement.has(elementID)) {
              skipElement.delete(elementID);
              continue;
            }
            nonIntersectedEle.push(entry);
          }
        }
        if (nonIntersectedEle.length == 0) {
          window.scrollBy({ top: 0 });
        }

        setCurrElements((prev) => {
          if (goingUp) {
            const currMovieID = prev.at(0)?.id;

            let moviesUptoAppended = nonIntersectedEle.length;

            let moviesUptoAppendedIdx =
              currMovieID - nonIntersectedEle.length - 1;

            if (moviesUptoAppendedIdx < 0) {
              moviesUptoAppended += moviesUptoAppendedIdx;
              moviesUptoAppendedIdx = 0;
            }

            prev.splice(prev.length - moviesUptoAppended, moviesUptoAppended);
            // window.scrollBy({
            //   top: elementHeightInPixel * moviesUptoAppended,
            //   behavior: "auto",
            // });

            for (let i = 0; i < moviesUptoAppended; i++) {
              skipElement.add(i);
            }

            const newMovieList: Array<Movie> = [];

            for (let i = currMovieID - 2; i >= moviesUptoAppendedIdx; i--) {
              newMovieList.push(MoviesData[i]);
            }
            return [...newMovieList, ...prev];
          } else {
            const currMovieID = prev.at(-1)?.id;

            let moviesUptoAppended = currMovieID + nonIntersectedEle.length;

            let nMoviesToBeAdded = nonIntersectedEle.length;

            if (currMovieID + nMoviesToBeAdded > MoviesData.length - 1) {
              nMoviesToBeAdded = MoviesData.length - currMovieID;
            }
            if (moviesUptoAppended > MoviesData.length) {
              moviesUptoAppended -= moviesUptoAppended - MoviesData.length;
            }
            prev.splice(0, moviesUptoAppended - currMovieID);
            // window.scrollBy({
            //   top: -(elementHeightInPixel * nMoviesToBeAdded),
            //   behavior: "auto",
            // });

            for (let i = prev.length; i < prev.length + nMoviesToBeAdded; i++) {
              skipElement.add(i);
            }

            const newMovies: Array<Movie> = [];
            for (let i = currMovieID; i < moviesUptoAppended; i++) {
              newMovies.push(MoviesData[i]);
            }

            return [...prev, ...newMovies];
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
      {currElements.map((movie, i) => (
        <ObservableElement
          movie={movie}
          key={i}
          id={`${i}`}
          intersectionObserver={intersectionObserver.current}
        />
      ))}
    </div>
  );
};

export default ScrollComponent;
