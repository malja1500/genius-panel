import { useRef } from "react";

export const useTimeOut = () => {
  const ref = useRef();

  return (fn, ms) => {
    clearTimeout(ref.current);
    const timeOut = setTimeout(fn, ms);
    ref.current = timeOut;
  };
};
