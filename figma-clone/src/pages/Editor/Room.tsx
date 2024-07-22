// import { LiveMap } from "@liveblocks/client";
// import {
//   RoomProvider,
//   ClientSideSuspense,
//   LiveblocksProvider,
//   useMutation,
// } from "@liveblocks/react/suspense";
// import Loader from "../../components/common/Loader";




// const Room = ({ children }: { children: React.ReactNode }) => {

//   const syncShapeInStorage = useMutation(({ storage }, object) => {
//     if (!object) return;
//     const { objectId } = object;
//     const shapeData = object.toJSON();
//     shapeData.objectId = objectId;
//     const canvasObjects = storage.get("canvasObjects");
//     canvasObjects!.set(objectId, shapeData);
//   }, []);


//    const deleteAllShapes = useMutation(({ storage }) => {
//     const canvasObjects = storage.get("canvasObjects");
//     if (!canvasObjects || canvasObjects.size === 0) return true;
//     for (const [key] of canvasObjects.entries()) {
//       canvasObjects.delete(key);
//     }
//     return canvasObjects.size === 0;
//   }, []);


  
//   return (
//     <LiveblocksProvider publicApiKey={"pk_prod_gDCNUSxb86BC6FgAtePTgf2zaNKL7S-EJ38Ii0nmfLvFKifPqeyDT0o9AwP7-ZOU"}>
//       <RoomProvider
//         id="fig-room"
//         initialPresence={{ title: "Untitled", cursor: null, cursorColor: null, editingText: null }}
//         initialStorage={{
//           canvasObjects: new LiveMap(),
//         }}
//       >
//         <ClientSideSuspense fallback={<Loader />}>
//           {() => children}
//         </ClientSideSuspense>
//       </RoomProvider>
//     </LiveblocksProvider>
//   );
// }

// export default Room;