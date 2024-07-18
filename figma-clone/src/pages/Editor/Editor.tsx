import LeftSidebar from "../../components/layout/editor/LeftSidebar";
import Navbar from "../../components/layout/editor/Navbar";
import RightSidebar from "../../components/layout/editor/RightSidebar";
import Live from "../../components/Live";
import Room from "./Room";

export default function Editor() {


  return (
    <>
      <main className='h-screen overflow-hidden w-screen'>
        <Room>
          <Navbar/>

          <section className='flex h-full flex-row'>
            <LeftSidebar/>
            <Live />
            <RightSidebar/>
          </section>
        </Room>
      </main >
    </>
  )
}









{/* <Navbar
      imageInputRef={imageInputRef}
      activeElement={activeElement}
      handleImageUpload={(e: any) => {
        // prevent the default behavior of the input element
        e.stopPropagation();

        handleImageUpload({
          file: e.target.files[0],
          canvas: fabricRef as any,
          shapeRef,
          syncShapeInStorage,
        });
      }}
      handleActiveElement={handleActiveElement}
    /> */}

{/* <section className='flex h-full flex-row'>
      <LeftSidebar allShapes={Array.from(canvasObjects)} />

      <Live canvasRef={canvasRef} undo={undo} redo={redo} />

      <RightSidebar
        elementAttributes={elementAttributes}
        setElementAttributes={setElementAttributes}
        fabricRef={fabricRef}
        isEditingRef={isEditingRef}
        activeObjectRef={activeObjectRef}
        syncShapeInStorage={syncShapeInStorage}
      />
    </section> */}