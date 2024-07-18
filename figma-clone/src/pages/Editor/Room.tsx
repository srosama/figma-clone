import { LiveMap } from "@liveblocks/client";
import {
  RoomProvider,
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import Loader from "../../components/common/Loader";




const Room = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider publicApiKey={"pk_prod_gDCNUSxb86BC6FgAtePTgf2zaNKL7S-EJ38Ii0nmfLvFKifPqeyDT0o9AwP7-ZOU"}>
      <RoomProvider
        id="fig-room"
        initialPresence={{ title: "Untitled", cursor: null, cursorColor: null, editingText: null }}
        initialStorage={{
          canvasObjects: new LiveMap(),
        }}
      >
        <ClientSideSuspense fallback={<Loader />}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default Room;