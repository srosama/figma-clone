import * as fabric from "fabric";
import { v4 as uuid4 } from "uuid";
import {
  CanvasMouseDown,
  CanvasMouseMove,
  CanvasMouseUp,
  CanvasObjectModified,
  CanvasObjectScaling,
  CanvasPathCreated,
  CanvasSelectionCreated,
  RenderCanvas
  ,
} from "../types/IEditorProps";
import { createSpecificShape } from "./shapes";
import { defaultNavElement } from "../utils";
import { IEvent } from "fabric/fabric-impl";




type initializeFabricProps = {
  fabricRef: React.MutableRefObject<fabric.Canvas | null>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

// initialize fabric canvas
export const initializeFabric = ({ fabricRef, canvasRef }: initializeFabricProps) => {
  const mainCanvas = document.getElementById("canvas");

  // create fabric canvas
  const canvas = new fabric.Canvas(canvasRef.current, {
    width: mainCanvas?.clientWidth,
    height: mainCanvas?.clientHeight,
  });

  //! set canvas reference to fabricRef so we can use it later anywhere 
  //! outside canvas listener

  fabricRef.current = canvas;
  return canvas;
};

// instantiate creation of custom fabric object/shape and add it to canvas
export const handleCanvasMouseDown = (
  { options
    , canvas
    , selectedShapeRef
    , isDrawing,
    shapeRef,
  }: CanvasMouseDown) => {
  // get the pointer that inisde the canvas
  const pointer = canvas.getPointer(options.e);
  const target = canvas.findTarget(options.e, false);
  canvas.isDrawingMode = false;


  if (selectedShapeRef.current === "freeform") {
    isDrawing.current = true;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    return;
  }

  // if target is the selected shape or active selection, set isDrawing to false
  if (
    target && (target.type === selectedShapeRef.current ||
      target.type === "activeSelection")
  ) {

    isDrawing.current = false;

    // set active object to target
    canvas.setActiveObject(target);
    target.setCoords();
  }

  else {
    isDrawing.current = true;
    // create custom fabric object/shape and set it to shapeRef
    shapeRef.current = createSpecificShape(
      selectedShapeRef.current,
      pointer as any
    );

    // if shapeRef is not null, add it to canvas
    if (shapeRef.current) {
      console.log("checkk this > ", shapeRef.current)
      canvas.add(shapeRef.current);
    }
  }
};

// handle mouse move event on canvas to draw shapes with different dimensions
export const handleCanvaseMouseMove = ({
  options,
  canvas,
  isDrawing,
  selectedShapeRef,
  shapeRef,
  syncShapeInStorage,
}: CanvasMouseMove) => {
  // if selected shape is freeform, return
  if (!isDrawing.current) return;
  if (selectedShapeRef.current === "freeform") return;

  canvas.isDrawingMode = false;

  // get pointer coordinates
  const pointer = canvas.getPointer(options.e);

  // depending on the selected shape, set the dimensions of the shape stored in shapeRef in previous step of handelCanvasMouseDown
  // calculate shape dimensions based on pointer coordinates
  switch (selectedShapeRef?.current) {
    case "rectangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "circle":
      shapeRef.current.set({
        radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
      });
      break;

    case "triangle":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    case "line":
      shapeRef.current?.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      break;

    case "image":
      shapeRef.current?.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });

    default:
      break;
  }

  // render objects on canvas
  // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
  canvas.renderAll();

  // sync shape in storage
  if (shapeRef.current?.objectId) {
    console.log(shapeRef.current)
    syncShapeInStorage(shapeRef.current);
  }
};

// handle mouse up event on canvas to stop drawing shapes
export const handleCanvasMouseUp = ({
  canvas,
  isDrawing,
  shapeRef,
  activeObjectRef,
  selectedShapeRef,
  syncShapeInStorage,
  setActiveElement,
}: CanvasMouseUp) => {
  isDrawing.current = false;
  if (selectedShapeRef.current === "freeform") return;

  // sync shape in storage as drawing is stopped
  syncShapeInStorage(shapeRef.current);

  // set everything to null
  shapeRef.current = null;
  activeObjectRef.current = null;
  selectedShapeRef.current = null;

  // if canvas is not in drawing mode, set active element to default nav element after 700ms
  if (!canvas.isDrawingMode) {
    setTimeout(() => {
      setActiveElement(defaultNavElement);
    }, 700);
  }
};


// !BUG fix the multi-selection 
export const handleCanvasObjectModified = ({
  options,
  syncShapeInStorage,
}: CanvasObjectModified) => {
  const target = options.target;
  if (!target) return;

  if (target.type === "activeSelection") {
    // Handle multiple selected objects
    const activeSelection = target as fabric.ActiveSelection; // Cast to the correct type
    console.log(activeSelection)
    activeSelection.forEachObject((obj) => {
      syncShapeInStorage(obj);
    });
  } else {
    syncShapeInStorage(target);
  }
};

// export const handleCanvasObjectModified = ({
//   options,
//   syncShapeInStorage,
// }: CanvasObjectModified) => {
//   const target = options.target;
//   if (!target) return;

//   if (target.type === "activeSelection") {
//     // If the target is an active selection, loop through all objects in the selection
//     const activeSelection = target as fabric.ActiveSelection;
//     activeSelection.forEachObject((object) => {
//       syncShapeInStorage(object);
//     });
//   } else {
//     // Otherwise, update the single object
//     const activeSelection = target as fabric.ActiveSelection;

//     syncShapeInStorage(target);
//   }
// };



// update shape in storage when path is created when in freeform mode
export const handlePathCreated = ({
  options,
  syncShapeInStorage,
}: CanvasPathCreated) => {
  // get path object
  const path = options.path;
  if (!path) return;

  // set unique id to path object
  path.set({
    objectId: uuid4(),
  });

  // sync shape in storage
  syncShapeInStorage(path);
};


// check how object is moving on canvas and restrict it to canvas boundaries
// export const handleCanvasObjectMoving = ({
//   options,
// }: {
//   options: IEvent;
// }) => {
//   // get target object which is moving
//   const target = options.target as fabric.FabricObject;

//   // target.canvas is the canvas on which the object is moving
//   const canvas = target.canvas as fabric.Canvas;

//   // set coordinates of target object
//   target.setCoords();

//   // // restrict object to canvas boundaries (horizontal)
//   // if (target && target.left) {
//   //   target.left = Math.max(
//   //     0,
//   //     Math.min(
//   //       target.left,
//   //       (canvas.width || 0) - (target.getScaledWidth() || target.width || 0)
//   //     )
//   //   );
//   // }

//   // // restrict object to canvas boundaries (vertical)
//   // if (target && target.top) {
//   //   target.top = Math.max(
//   //     0,
//   //     Math.min(
//   //       target.top,
//   //       (canvas.height || 0) - (target.getScaledHeight() || target.height || 0)
//   //     )
//   //   );
//   // }
// };

// set element attributes when element is selected
export const handleCanvasSelectionCreated = ({
  options,
  isEditingRef,
  setElementAttributes,
}: CanvasSelectionCreated) => {
  // if user is editing manually, return
  if (isEditingRef.current) return;

  // if no element is selected, return
  if (!options?.selected) return;

  // get the selected element
  const selectedElement = options?.selected[0] as fabric.FabricObject;

  // if only one element is selected, set element attributes
  if (selectedElement && options.selected.length === 1) {
    // calculate scaled dimensions of the object
    const scaledWidth = selectedElement?.scaleX
      ? selectedElement?.width! * selectedElement?.scaleX
      : selectedElement?.width;

    const scaledHeight = selectedElement?.scaleY
      ? selectedElement?.height! * selectedElement?.scaleY
      : selectedElement?.height;

    setElementAttributes({
      width: scaledWidth?.toFixed(0).toString() || "",
      height: scaledHeight?.toFixed(0).toString() || "",
      fill: selectedElement?.fill?.toString() || "",
      stroke: selectedElement?.stroke || "",
      // @ts-ignore
      fontSize: selectedElement?.fontSize || "",
      // @ts-ignore
      fontFamily: selectedElement?.fontFamily || "",
      // @ts-ignore
      fontWeight: selectedElement?.fontWeight || "",
    });
  }
};

// update element attributes when element is scaled
export const handleCanvasObjectScaling = ({
  options,
  setElementAttributes,
}: CanvasObjectScaling) => {
  const selectedElement = options.target;

  // calculate scaled dimensions of the object
  const scaledWidth = selectedElement?.scaleX
    ? selectedElement?.width! * selectedElement?.scaleX
    : selectedElement?.width;

  const scaledHeight = selectedElement?.scaleY
    ? selectedElement?.height! * selectedElement?.scaleY
    : selectedElement?.height;

  setElementAttributes((prev) => ({
    ...prev,
    width: scaledWidth?.toFixed(0).toString() || "",
    height: scaledHeight?.toFixed(0).toString() || "",
  }));
};


export const renderCanvas = async ({
  fabricRef,
  canvasObjects,
  activeObjectRef,
}: RenderCanvas): Promise<void> => {
  if (!fabricRef.current) return;

  fabricRef.current.clear();

  // Debugging: Log current canvasObjects
  console.log('Canvas Objects:', canvasObjects);

  const objectsArray = Array.from(canvasObjects.values());
  try {
    const enlivenedObjects = await fabric.util.enlivenObjects<fabric.FabricObject>(objectsArray);

    // Debugging: Log enlivened objects
    console.log('Enlivened Objects:', enlivenedObjects);

    enlivenedObjects.forEach((obj, i) => {
      if (activeObjectRef.current?.objectId === i) {
        fabricRef.current?.setActiveObject(obj);
      }

      fabricRef.current?.add(obj);
    });

    fabricRef.current.renderAll();
  } catch (error) {
    console.error('Failed to enliven objects:', error);
  }
}

// Resize canvas dimensions on window resize
export const handleResize = ({ canvas }: { canvas: fabric.Canvas | null }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement || !canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};

// Zoom canvas on mouse scroll
export const handleCanvasZoom = ({
  options,
  canvas,
}: {
  options: IEvent & { e: WheelEvent };
  canvas: fabric.Canvas;
}) => {
  const delta = options.e.deltaY;
  let zoom = canvas.getZoom();

  // Allow zooming to min 20% and max 100%
  const minZoom = 0.2;
  const maxZoom = 1;
  const zoomStep = 0.001;

  // Calculate zoom based on mouse scroll wheel with min and max zoom
  zoom = Math.min(Math.max(minZoom, zoom + delta * zoomStep), maxZoom);

  // Set zoom to canvas
  // zoomToPoint: http://fabricjs.com/docs/fabric.Canvas.html#zoomToPoint
  canvas.zoomToPoint({ x: options.e.offsetX, y: options.e.offsetY }, zoom);

  options.e.preventDefault();
  options.e.stopPropagation();
};









