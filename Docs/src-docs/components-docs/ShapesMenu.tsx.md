import { ShapesMenuProps } from "../types/IEditorProps";
import { Button } from "./common/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./common/ui/dropdown-menu";

const ShapesMenu = ({
  item,
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: ShapesMenuProps) => {
  const isDropdownElem = item.value.some((elem) => elem?.value === activeElement.value);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="no-ring">
          <Button className="relative h-5 w-5 object-contain" onClick={() => handleActiveElement(item)}>
            <img
              src={isDropdownElem ? activeElement.icon : item.icon}
              alt={item.name}
              className={isDropdownElem ? "invert" : ""}
            />
          </Button>
        </DropdownMenuTrigger>


      </DropdownMenu>


    </>
  );
};

export default ShapesMenu;
