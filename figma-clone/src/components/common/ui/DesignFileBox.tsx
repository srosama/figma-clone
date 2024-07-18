import { useState } from "react";
import { penIcon } from "../../../utils";
import DesignFilePop from "./DesignFilePop";

export default function DesignFileBox() {
    const [showModal, setShowModal] = useState(false); // Start with false

    function onClickNewDesign() {
        setShowModal(!showModal); // Toggle showModal state
    }

    return (
        <>
            <DesignFilePop openClose={showModal} setShowModal={setShowModal} />
            <div
                onClick={onClickNewDesign}
                className="group hover:bg-[#0C8CE9] flex cursor-pointer justify-left items-left m-5 p-6 gap-4 w-96 mb-5 bg-[#383838] rounded-xl select-none"
            >
                {/* Pass setShowModal to handle opening and closing modal */}
                <div className="group-hover:bg-[#484848] bg-[#0C8CE9] rounded-full w-10 h-10 flex items-center justify-center text-white text-sm">
                    <img className="rotate-90" src={penIcon} alt="penIcon" width={20} />
                </div>
                <div className="text-white text-sm select-none">
                    <h3>New design file</h3>
                    <h3>Design and prototype</h3>
                </div>
            </div>
        </>
    );
}
