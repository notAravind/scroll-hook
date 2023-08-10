import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const CompRender = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Rendered", counter);
    // if (counter > 1000) return;
    // Promise.resolve().then(increment);
    return () => {
      console.log("Unmounted", counter);
    };
  }, [counter]);
  const increment = () => {
    console.log("Triggered 1");

    flushSync(() => {
      setCounter((c) => {
        console.log("In Set Counter 1");
        return c + 1;
      });
    });

    console.log("End Increment 1");

    console.log("Triggered 2");

    flushSync(() => {
      setCounter((c) => {
        console.log("In Set Counter 2");
        return c + 1;
      });
    });

    console.log("End Increment 2");
  };
  return (
    <div>
      {console.log("Rendered in return", counter)}
      {counter}
      <button onClick={() => increment()}>Increment</button>
    </div>
  );
};

export default CompRender;
