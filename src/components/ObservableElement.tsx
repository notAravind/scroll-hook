import { useEffect, useRef } from "react";

const ObservableElement = ({
  color,
  intersectionObserver,
  id,
}: {
  color: string;
  id: string;
  intersectionObserver: IntersectionObserver | undefined;
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (elementRef.current) {
      intersectionObserver.observe(elementRef.current);
    }
    return () => {
      intersectionObserver?.unobserve(elementRef.current);
    };
  }, []);
  return (
    <div id={id} ref={elementRef} style={{ height: "20vh", color }}>
      Element
    </div>
  );
};

export default ObservableElement;
