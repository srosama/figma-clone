import { useRef, useState } from "react";
import Navbar from "../../components/layout/editor/Navbar"
import { ActiveElement } from "../../types/IEditorProps";
import LeftSidebar from "../../components/layout/editor/LeftSidebar";
import RightSidebar from "../../components/layout/editor/RightSidebar";
import Live from "../../components/Live";

export default function Editor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    //   switch (elem?.value) {
    //     case "reset":
    //       deleteAllShapes();
    //       fabricRef.current?.clear();
    //       setActiveElement(defaultNavElement);
    //       break;
    //     case "delete":
    //       handleDelete(fabricRef.current as any, deleteShapeFromStorage);
    //       setActiveElement(defaultNavElement);
    //       break;
    //     case "image":
    //       imageInputRef.current?.click();
    //       isDrawing.current = false;
    //       if (fabricRef.current) {
    //         fabricRef.current.isDrawingMode = false;
    //       }
    //       break;
    //     case "comments":
    //       break;
    //     default:
    //       selectedShapeRef.current = elem?.value as string;
    //       break;
    //   }
  };


  return (
    <>
      <main className="h-screen w-screen overflow-hidden">

        <Navbar
          activeElement={activeElement}
          handleActiveElement={handleActiveElement}

        />

        <section className="flex h-full flex-row">
          <LeftSidebar />
          <Live canvasRef={canvasRef}/>
          <RightSidebar />
        </section>
      </main>
    </>
  )
}
