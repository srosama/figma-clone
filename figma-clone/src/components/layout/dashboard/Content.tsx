// Content component
import React from "react";
import { ContentProp } from '../../../types/IDashBoardProp';
import DesignFileBox from "../../common/ui/DesignFileBox";
import DesignFileObjects from "../../common/DesignFileObjects";


// !DON'T USE THIS FOR A REAL-WOLRD APP 

const Content: React.FC<ContentProp> = ({ recentOrDraft }: ContentProp) => {
  return (
    <div className="w-full">
      {recentOrDraft === 'recent' ? (<>

        <div className="border-b-[0.5px] w-full border-borderColor pt-5 pl-8 text-white pb-5">
          <p>Recent</p>
        </div>

        <DesignFileBox />
        <div className="border-b-[0.5px] w-full border-borderColor"></div>
          <DesignFileObjects />
      </>
      ) : (

        <>
          <div className="border-b-[0.5px] w-full border-borderColor pt-5 pl-8 text-white pb-5">
            <p>Draft</p>
          </div>

          <DesignFileObjects />
        </>
      )}
    </div>
  );
};

export default Content;