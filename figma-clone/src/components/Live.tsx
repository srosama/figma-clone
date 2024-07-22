import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@radix-ui/react-context-menu";
import LiveCursors from "./cursor/LiveCursor";
import { useEventListener, useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { shortcuts } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { CursorMode, CursorState } from "../types/IEditorProps";
import CursorChat from "./cursor/CursorChat";
import useInterval from "../hooks/useInterval";

type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  undo?: () => void;
  redo?: () => void;
};

export default function Live({ canvasRef }: Props) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });


  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: false } : state
    );
  }, [cursorState.mode, setCursorState]);



  // Listen to keyboard events to change the cursor state
  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [updateMyPresence]);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      // broadcast the cursor position to other users
      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    setCursorState({
      mode: CursorMode.Hidden,
    });
    updateMyPresence({
      cursor: null,
      message: null,
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      // get the cursor position in the canvas
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({
        cursor: {
          x,
          y,
        },
      });

      // if cursor is in reaction mode, set isPressed to true
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state
      );
    },
    [cursorState.mode, setCursorState]
  );


  const handleContextMenuClick = useCallback((key: string) => {
    switch (key) {
      case "Chat":
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
        break;

      // case "Undo":
      //   undo();
      //   break;

      // case "Redo":
      //   redo();
      //   break;

      default:
        break;
    }
  }, []);


  return (
    // Undo + Redo 
    <>
      {/* <ContextMenu>
        <ContextMenuTrigger
       
        </ContextMenuTrigger> */}


      <div
        className="relative flex h-screen w-screen flex-1"
        id="canvas"
        // style={{
        //   cursor: cursorState.mode === CursorMode.Chat ? "none" : "auto",
        // }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <LiveCursors others={others} />

        <canvas ref={canvasRef} />

        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />)}

      </div>


      {/* 
        <ContextMenuContent className="right-menu-content">
          {shortcuts.map((item) => (
            <ContextMenuItem
              key={item.key}
              className="right-menu-item"
            onClick={() => handleContextMenuClick(item.name)}
            >
              <p>{item.name}</p>
              <p className="flex text-xs text-primary-grey-300">{item.shortcut}</p>
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu> */}
    </>
  );
}
