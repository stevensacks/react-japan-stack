import type {RefObject} from 'react';
import {useEffect, useRef, useState} from 'react';

// Use trigger if you want to force a measurement based on a variable changing
const useComponentRect = (
  ref: RefObject<HTMLElement>,
  trigger?: unknown
): DOMRect => {
  const [rect, setRect] = useState<DOMRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    toJSON: () => {},
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const timeoutRef = useRef<null | number>(null);

  useEffect(() => {
    if (ref) {
      const onUpdate = () => {
        if (ref.current) {
          setRect(ref.current.getBoundingClientRect());
        }
      };

      if (ref.current) {
        window.addEventListener('resize', onUpdate);
        window.addEventListener('scroll', onUpdate);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(onUpdate);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        window.removeEventListener('resize', onUpdate);
        window.removeEventListener('scroll', onUpdate);
      };
    }

    return undefined;
  }, [ref, trigger]);

  return rect;
};

export default useComponentRect;
