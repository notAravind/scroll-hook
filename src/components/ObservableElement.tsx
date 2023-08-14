import { useEffect, useRef } from "react";
import { Movie } from "./scrollOnDemand";

const ObservableElement = ({
  movie,
  intersectionObserver,
  id,
}: {
  movie: Movie;
  id: string;
  intersectionObserver: IntersectionObserver | undefined;
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const ele = elementRef.current;
    if (elementRef.current) {
      intersectionObserver.observe(elementRef.current);
    }
    return () => {
      intersectionObserver?.unobserve(ele);
    };
  }, []);
  return (
    <div id={id} ref={elementRef} style={{ height: "25vh" }}>
      {movie.movie}
    </div>
  );
};

export default ObservableElement;
