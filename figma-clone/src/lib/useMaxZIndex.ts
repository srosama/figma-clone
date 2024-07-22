import { useThreads } from "@liveblocks/react/suspense";
import { useMemo } from "react";



export const useMaxZIndex = () => {
  // get all threads
  const { threads } = useThreads();

  // calculate the max z-index
  return useMemo(() => {
    let max = 0;
    for (const thread of threads) {
      // @ts-ignore
      if (thread.metadata.zIndex > max) {
        // @ts-ignore
        max = thread.metadata.zIndex;
      }
    }
    return max;
  }, [threads]);
};
