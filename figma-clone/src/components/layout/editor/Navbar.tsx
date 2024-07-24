import { ActiveElement, NavbarProps } from "../../../types/IEditorProps";
import { FigmaLogoOutlineIcon, navElements } from "../../../utils";
import ShapesMenu from "../../ShapesMenu";
import ActiveUsers from "./users/ActiveUsers";
import ObjectDesignFile from "../../ObjectDesignFile";

export default function Navbar({ activeElement, handleActiveElement, imageInputRef, handleImageUpload }: NavbarProps) {

    const isActive = (value: string | Array<ActiveElement>) => {
        return (typeof value === 'string' && activeElement && activeElement.value === value) ||
            (Array.isArray(value) && value.some((val) => val?.value === activeElement?.value));
    };
    
    //! fix + add 
    // const [isRest, setIsRest] = useState(false)

    return (
        <nav className="flex items-center justify-between gap-4 w-full
        border-b-[0.5px] border-borderColor z-2
        bg-backgroundDash text-white">
            <div className="flex flex-row">
                <div className="p-3 pl-2  flex items-center 
                 justify-center border-r-[0.5px] border-borderColor">
                    <img className="cursor-pointer" src={FigmaLogoOutlineIcon} alt="FigLogo" width={30} height={20} />
                </div>

                <ul className="flex flex-row">
                    {navElements.map((item: ActiveElement | any) => (
                        <li
                            key={item.name}
                            onClick={() => {
                                if (!Array.isArray(item.value)) {
                                    handleActiveElement(item);
                                }
                            }}
                            className={`
                                z-10                                group p-3 pb-3 pl-2 
                                flex justify-center items-center
                                cursor-pointer
                                border-r-[0.5px] border-borderColor
                                ${isActive(item.value) ? "bg-[#0C8CE9]" : "hover:bg-borderColor transition-all hover:transition-all duration-300"}
                            `}
                        >
                            {Array.isArray(item.value) ? (
                                <ShapesMenu
                                    item={item}
                                    activeElement={activeElement}
                                    handleActiveElement={handleActiveElement}
                                    imageInputRef={imageInputRef}
                                    handleImageUpload={handleImageUpload}
                                />
                            ) : (
                                <div className="w-[40px] flex items-center justify-center">
                                    <img src={item.icon} width={17} />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>


            </div>
            <ObjectDesignFile />
            <ActiveUsers />
        </nav>
    );
}
