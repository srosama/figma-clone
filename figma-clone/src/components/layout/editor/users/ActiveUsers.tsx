import { useMemo } from "react";
import Avatar from "./Avatar";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { generateRandomName } from "../../../../lib/utils";

const ActiveUsers = () => {
  const others = useOthers();
  const currentUser = useSelf();

  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <div className='flex items-center justify-center gap-1 pl-1
            border-l-[0.5px] border-borderColor'>
            <div className="p-3 pb-1 pl-2 ">

        {currentUser && (
          <Avatar name='You' otherStyles='border-[3px] border-green-500' />
        )}

        {others.slice(0, 2).map(({ connectionId }) => (
          <Avatar
          key={connectionId}
          name={generateRandomName()}
          otherStyles='-ml-3'
          />
        ))}

        {hasMoreUsers && (
          <div className='z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black'>
            +{others.length - 2}
          </div>
        )}
        </div>
      </div>
    );
  }, [others.length]);

  return memoizedUsers;
};

export default ActiveUsers;