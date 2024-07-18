import { DesignFileProp } from "../../types/IDashBoardProp";
import { thumbnailBg } from "../../utils";

export default function DesignFileObjects({ }: DesignFileProp) {
  return (
    <>
      <div className="m-5 p-6 pt-0 pl-2 grid grid-cols-4 gap-10">

        <div className="space-y-2 space-x-1">
          <div
            className="bg-[#1E1E1E]  border-[0.5px] border-borderColor 
             w-96 h-60 rounded-xl bg-center bg-cover bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(${thumbnailBg})` }}
          ></div>


          <div className="text-white text-sm">
            <h4>Digma Board UI</h4>
            <p className="text-opacity-50 text-white">Edited 2 minutes ago</p>
          </div>
        </div>

      </div>

    </>)
}
