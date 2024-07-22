import { memo } from "react";
import { ActiveElement, NavbarProps } from "../../../types/IEditorProps";
import { FigmaLogoOutlineIcon, navElements } from "../../../utils";
import { Button } from "../../common/ui/button";
import ActiveUsers from "./users/ActiveUsers";
import ShapesMenu from "../../ShapesMenu";


const Navbar = ({ activeElement, imageInputRef, handleImageUpload, handleActiveElement }: NavbarProps) => {
  
};

export default memo(Navbar, (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement);

if the value is array it will render ad a dropdown menu 
but if not it will be in the nav as a span 


          
    {/* <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      /> */}