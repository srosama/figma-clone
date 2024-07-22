  return (
    <ContextMenu>
       <ContextMenuTrigger
        className="relative flex h-full w-full flex-1 items-center justify-center"
        id="canvas"
        style={{
          cursor: cursorState.mode === CursorMode.Chat ? "none" : "auto",
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <canvas ref={canvasRef} />


        {/* If cursor is in chat mode, show the chat cursor */}
        {cursor && (
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
        )}


        {/* Show the live cursors of other users */}
        <LiveCursors others={others} />

        {/* Show the comments */}
      </ContextMenuTrigger>

      <ContextMenuContent className="right-menu-content">
//         {shortcuts.map((item) => (
          <ContextMenuItem
            key={item.key}
            className="right-menu-item"
            onClick={() => handleContextMenuClick(item.name)}
          >
            <p>{item.name}</p>
            <p className="text-xs text-primary-grey-300">{item.shortcut}</p>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}













export default Live;


// <ContextMenu>
//       <ContextMenuTrigger
//         className="relative flex h-full w-full flex-1 items-center justify-center"
//         id="canvas"
//         style={{
//           cursor: cursorState.mode === CursorMode.Chat ? "none" : "auto",
//         }}
//         onPointerMove={handlePointerMove}
//         onPointerLeave={handlePointerLeave}
//         onPointerDown={handlePointerDown}
//       >
//         <canvas />

//         {cursor && (
//           <CursorChat
//             cursor={cursor}
//             cursorState={cursorState}
//             setCursorState={setCursorState}
//             updateMyPresence={updateMyPresence}
//           />
//         )}

      
//         <LiveCursors others={others} />

//       </ContextMenuTrigger>

//
//     </ContextMenu>