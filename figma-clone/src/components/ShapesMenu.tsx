import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ShapesMenuProps } from "../types/IEditorProps";
import { Button } from "./common/ui/button";

export default function ShapesMenu({ item, activeElement, handleActiveElement, handleImageUpload, imageInputRef }: ShapesMenuProps) {
  const isDropdownElem = item.value.some((elem) => elem?.value === activeElement.value);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center w-[40px]">
            <Button variant="noneUse" size="icon"
              onClick={() => handleActiveElement(item)}>
              <img
                src={isDropdownElem ? activeElement.icon : item.icon}
                alt={item.name}
                className={isDropdownElem ? "invert" : ""}
                width={17}
              />
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-5 flex flex-col 
      gap-y-1 border-none bg-borderColor py-4 text-white">

          {item.value.map((elem) => (
            <Button
              variant={"noneUse"}
              key={elem?.name}
              onClick={() => handleActiveElement(elem)}
              className={`flex h-fit  justify-between gap-10 
              rounded-none px-5 py-3 focus:border-none
               ${activeElement.value === elem?.value ?
                  "bg-green-500" : "hover:bg-gray-500"
                }`}
            >
              <div className="group flex items-center gap-2">
                <img
                  src={elem?.icon as string}
                  alt={elem?.name as string}
                  width={20}
                  height={20}
                  className={activeElement.value === elem?.value ? "invert" : ""}
                />
                <p
                  className={`text-sm 
                  ${activeElement.value === elem?.value ?
                      "text-black" : "text-white"}`}
                >
                  {elem?.name}
                </p>
              </div>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </>
  );
}
