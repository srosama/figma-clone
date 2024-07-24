import { useMemo } from "react";
import { getShapeInfo } from "../../../lib/utils";

export default function LeftSidebar({ allShapes }: { allShapes: Array<any> }) {
  const memoizedShapes = useMemo(() => {
    return (
      <section
        className="flex flex-col -z-20 bg-backgroundDash text-white min-w-[227px] 
        sticky top-0 right-0 h-full max-sm:hidden select-none
        border-borderColor sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px]"
      >
        <h3 className="px-5 pt-4 pb-4 text-xs uppercase border-b border-borderColor">
          Layers
        </h3>
        <div className="flex flex-col">
          {allShapes?.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type);

            return (
              <div
                key={shape[1]?.objectId}
                className="group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-primary-green hover:text-primary-black"
              >
                <img
                  src={info?.icon}
                  alt='Layer'
                  width={16}
                  height={16}
                  className='group-hover:invert'
                />
                <h3 className='text-sm font-semibold capitalize'>{info.name}</h3>
              </div>
            );
          })}
        </div>
      </section>
    );
  }, [allShapes?.length]);

  return memoizedShapes;
}
