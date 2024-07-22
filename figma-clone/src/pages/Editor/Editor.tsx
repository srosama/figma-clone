import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/layout/editor/Navbar"
import { ActiveElement, Attributes } from "../../types/IEditorProps";
import LeftSidebar from "../../components/layout/editor/LeftSidebar";
import RightSidebar from "../../components/layout/editor/RightSidebar";
import Live from "../../components/Live";
import { handleCanvaseMouseMove, handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, handleCanvasObjectMoving, handleCanvasObjectScaling, handleCanvasSelectionCreated, handleCanvasZoom, handlePathCreated, handleResize, initializeFabric, renderCanvas } from "../../lib/canvas";
import { Canvas, FabricObject } from "fabric";
import { useMutation, useRedo, useStorage, useUndo } from "@liveblocks/react/suspense";
import { handleDelete, handleKeyDown } from "../../lib/key-events";
import { defaultNavElement } from "../../utils";
import { handleImageUpload } from "../../lib/shapes";

export default function Editor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<FabricObject | null>(null);
  const selectedShapeRef = useRef<string | null>(null);
  const activeObjectRef = useRef<FabricObject | null>(null);
  const isEditingRef = useRef(false);
  const canvasObjects = useStorage((root) => root.canvasObjects);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const undo = useUndo();
  const redo = useRedo();


  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if (!object) return;
    const { objectId } = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;

    const canvasObjects = storage.get("canvasObjects");
    canvasObjects?.set(objectId, shapeData);
  }, []);

  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    switch (elem?.value) {
      case "reset":
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveElement(defaultNavElement);
        break;
      case "delete":
        handleDelete(fabricRef.current as any, deleteShapeFromStorage);
        setActiveElement(defaultNavElement);
        break;
      case "image":
        imageInputRef.current?.click();
        isDrawing.current = false;
        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false;
        }
        break;
      case "comments":
        break;
      default:
        selectedShapeRef.current = elem?.value as string;
        break;
    }
  };

  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects?.delete(shapeId);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get("canvasObjects");
    if (!canvasObjects || canvasObjects.size === 0) return true;
    for (const [key] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }
    return canvasObjects.size === 0;
  }, []);


  useEffect(() => {
    const canvas = initializeFabric({
      canvasRef,
      fabricRef,
    });

    const handleMouseDown = (options: any) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    };

    const handleMouseMove = (options: any) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    };

    const handleMouseUp = () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
      });
    };

    const handlePathCreatedEvent = (options: any) => {
      handlePathCreated({
        options,
        syncShapeInStorage,
      });
    };

    const handleObjectModifiedEvent = (options: any) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    };

    const handleObjectMovingEvent = (options: any) => {
      handleCanvasObjectMoving({
        options,
      });
    };

    const handleSelectionCreatedEvent = (options: any) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    };

    const handleObjectScalingEvent = (options: any) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      });
    };

    const handleMouseWheel = (options: any) => {
      handleCanvasZoom({
        options,
        canvas,
      });
    };

    canvas.on("mouse:down", handleMouseDown);
    canvas.on("mouse:move", handleMouseMove);
    canvas.on("mouse:up", handleMouseUp);
    canvas.on("path:created", handlePathCreatedEvent);
    canvas.on("object:modified", handleObjectModifiedEvent);
    canvas.on("object:moving", handleObjectMovingEvent);
    canvas.on("selection:created", handleSelectionCreatedEvent);
    canvas.on("object:scaling", handleObjectScalingEvent);
    canvas.on("mouse:wheel", handleMouseWheel);

    const handleResizeEvent = () => {
      handleResize({ canvas: fabricRef.current });
    };

    const handleKeyDownEvent = (e: any) => {
      handleKeyDown({
        e,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      });
    };

    window.addEventListener("resize", handleResizeEvent);
    window.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", handleResizeEvent);
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [canvasRef]);


  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,
    });
  }, [canvasObjects]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.backgroundColor = "#1E1E1E";
    }
  }, []);



  return (
    <>
      <main className="h-screen w-screen overflow-hidden">
        <Navbar
          activeElement={activeElement}
          imageInputRef={imageInputRef}
          handleImageUpload={(e: any) => {
            e.stopPropagation();
            handleImageUpload({
              file: e.target.files[0],
              canvas: fabricRef as any,
              shapeRef,
              syncShapeInStorage,
            });
          }}
          handleActiveElement={handleActiveElement}
        />

        <section className="flex h-full flex-row">
          <LeftSidebar />
          <Live canvasRef={canvasRef} undo={undo} redo={redo}/>
          <RightSidebar
            elementAttributes={elementAttributes}
            setElementAttributes={setElementAttributes}
            fabricRef={fabricRef}
            activeObjectRef={activeObjectRef}
            isEditingRef={isEditingRef}
            syncShapeInStorage={syncShapeInStorage}
          />
        </section>
      </main>
    </>
  )
}
