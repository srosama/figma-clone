import { LiveMap } from "@liveblocks/client";
import {
    RoomProvider,
    ClientSideSuspense,
    LiveblocksProvider,
} from "@liveblocks/react/suspense";
import Loader from "../../components/Loader";
const public_Key = import.meta.env.VITE_LIVEBLOCK_API;



const Room = ({ children }: { children: React.ReactNode }) => {
    return (
        <LiveblocksProvider publicApiKey={public_Key}>
            <RoomProvider id='figma-clone'
                initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
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