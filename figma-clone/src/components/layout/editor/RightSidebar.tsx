import { useMemo, useRef } from "react";
import { RightSidebarProps } from "../../../types/IEditorProps";
import Dimensions from "../../settings/Dimensions";
import Text from "../../settings/Text";
import Color from "../../settings/Color";
import Export from "../../settings/Export";
import { modifyShape } from "../../../lib/shapes";
import { Canvas } from "fabric";

export default function RightSidebar({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage }: RightSidebarProps) {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  //! Rest to the canvas attributes if the user is not editing
  //! Change the attributes for every element while editing and the element is active 

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));
    console.log(property)
    modifyShape({
      canvas: fabricRef.current as Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  const memoizedContent = useMemo(
    () => (
      <section className="flex flex-col 
 bg-backgroundDash text-white min-w-[227px] 
 sticky top-0 right-0 h-full max-sm:hidden select-none
  border-borderColor sm:min-w-[200px] md:min-w-[250px] lg:min-w-[300px]">

        <h3 className=" px-5 pt-4 pb-4 text-xs uppercase border-b border-borderColor">Design</h3>

        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}

        />

        <Color
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          placeholder="color"
          attributeType="fill"
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          placeholder="stroke"
          attributeType="stroke"
          handleInputChange={handleInputChange}
        />

        <Export />
      </section>
    ),
    [elementAttributes]
  );

  return memoizedContent;
};

