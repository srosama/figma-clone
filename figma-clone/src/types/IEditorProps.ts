import { BaseUserMeta, User } from "@liveblocks/client";
import { Canvas, FabricObject, Gradient, Path, Pattern, TEvent } from "fabric";

export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type CursorState = 

  | {
    mode: CursorMode.Hidden;
  }
  | {
    mode: CursorMode.Chat;
    message: string;
    previousMessage: string | null;
  }
  | {
    mode: CursorMode.ReactionSelector;
  }
  | {
    mode: CursorMode.Reaction;
    reaction: string;
    isPressed: boolean;
  };
  




export type ShapeData = {
  type: string;
  width: number;
  height: number;
  fill: string | Pattern | Gradient;
  left: number;
  top: number;
  objectId: string | undefined;
};

export type Attributes = {
  width: string;
  height: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  stroke: string;
};

export type ActiveElement = {
  name: string;
  value: string;
  icon: string;
} | null;

export type NavbarProps = {
  activeElement: ActiveElement;
  imageInputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleActiveElement: (element: ActiveElement) => void;
};


export interface CustomFabricObject<T extends FabricObject>
  extends FabricObject {
  objectId?: string;
}

export type ModifyShape = {
  canvas: Canvas;
  property: string;
  value: any;
  activeObjectRef: React.MutableRefObject<FabricObject | null>;
  syncShapeInStorage: (shape: FabricObject) => void;
};

export type ElementDirection = {
  canvas: Canvas;
  direction: string;
  syncShapeInStorage: (shape: FabricObject) => void;
};

export type ImageUpload = {
  file: File;
  canvas: React.MutableRefObject<Canvas>;
  shapeRef: React.MutableRefObject<FabricObject | null>;
  syncShapeInStorage: (shape: FabricObject) => void;
};

export type RightSidebarProps = {
  elementAttributes: Attributes;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
  fabricRef: React.RefObject<Canvas | null>;
  activeObjectRef: React.RefObject<FabricObject | null>;
  isEditingRef: React.MutableRefObject<boolean>;
  syncShapeInStorage: (obj: any) => void;
};



export type ShapesMenuProps = {
  item: {
    name: string;
    icon: string;
    value: Array<ActiveElement>;
  };
  activeElement: any;
  handleActiveElement: any;
  handleImageUpload: any;
  imageInputRef: any;
};

export type Presence = any;

export type LiveCursorProps = {
  others: readonly User<Presence, BaseUserMeta>[];
};

export type CanvasMouseDown = {
  options: TEvent;
  canvas: Canvas;
  selectedShapeRef: any;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: React.MutableRefObject<FabricObject | null>;
};

export type CanvasMouseMove = {
  options: TEvent;
  canvas: Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  selectedShapeRef: any;
  shapeRef: any;
  syncShapeInStorage: (shape: FabricObject) => void;
};

export type CanvasMouseUp = {
  canvas: Canvas;
  isDrawing: React.MutableRefObject<boolean>;
  shapeRef: any;
  activeObjectRef: React.MutableRefObject<FabricObject | null>;
  selectedShapeRef: any;
  syncShapeInStorage: (shape: FabricObject) => void;
  setActiveElement: any;
};

export type CanvasObjectModified = {
  options: TEvent;
  syncShapeInStorage: (shape: FabricObject) => void;
};

export type CanvasPathCreated = {
  options: (TEvent & { path: CustomFabricObject<Path> }) | any;
  syncShapeInStorage: (shape: FabricObject) => void;
};

export type CanvasSelectionCreated = {
  options: TEvent;
  isEditingRef: React.MutableRefObject<boolean>;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type CanvasObjectScaling = {
  options: TEvent;
  setElementAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};

export type RenderCanvas = {
  fabricRef: React.MutableRefObject<Canvas | null>;
  canvasObjects: any;
  activeObjectRef: any;
};

export type CursorChatProps = {
  cursor: { x: number; y: number };
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number; y: number };
      cursorColor: string;
      message: string;
    }>
  ) => void;
};