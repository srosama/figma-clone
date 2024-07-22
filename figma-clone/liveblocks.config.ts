import { LiveList, LiveMap } from "@liveblocks/client";



declare global {
  interface Liveblocks {
    Presence: {
      cursor: { x: number; y: number } | null;
      cursorColor: string | null;
      editingText: string | null;
    };
    Storage: {
      canvasObjects: LiveMap<string, any>;
    };
    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar: string;
      };
    };
    RoomEvent: { type: string; payload?: any };
    ThreadMetadata: {
      x: number;
      y: number;
    };
    RoomInfo: {
      title: string;
      url: string;
    };
  }
}



export { };
