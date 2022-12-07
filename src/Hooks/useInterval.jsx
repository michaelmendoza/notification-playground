import { useEffect, useRef } from "react";

/** useInterval Hook sets up an interval with setInterval and clears it after unmounting.
 *  Taken from https://overreacted.io/making-setinterval-declarative-with-react-hooks/ */
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
        savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
    }, [delay]);
}

export default useInterval;