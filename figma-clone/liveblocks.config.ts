// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import 'vite/client'
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: import.meta.env.LIVEBLOCK_API
});

export const {
  RoomProvider,
  useOthers, // 👈
} = createRoomContext(client);


// export const {
//   suspense: {
//     RoomProvider,
//     useRoom,
//     useMyPresence,
//     useUpdateMyPresence,
//     useSelf,
//     useOthers,
//     useOthersMapped,
//     useOthersConnectionIds,
//     useOther,
//     useBroadcastEvent,
//     useEventListener,
//     useErrorListener,
//     useStorage,
//     useObject,
//     useMap,
//     useList,
//     useBatch,
//     useHistory,
//     useUndo,
//     useRedo,
//     useCanUndo,
//     useCanRedo,
//     useMutation,
//     useStatus,
//     useLostConnectionListener,
//     useThreads,
//     useUser,
//     useCreateThread,
//     useEditThreadMetadata,
//     useCreateComment,
//     useEditComment,
//     useDeleteComment,
//     useAddReaction,
//     useRemoveReaction,
//   },
// } = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client, {
//   async resolveUsers({ userIds }) {
//     // Used only for Comments. Return a list of user information retrieved
//     // from `userIds`. This info is used in comments, mentions etc.

//     // const usersData = await __fetchUsersFromDB__(userIds);
//     //
//     // return usersData.map((userData) => ({
//     //   name: userData.name,
//     //   avatar: userData.avatar.src,
//     // }));

//     return [];
//   },
//   async resolveMentionSuggestions({ text, roomId }) {
//     // Used only for Comments. Return a list of userIds that match `text`.
//     // These userIds are used to create a mention list when typing in the
//     // composer.
//     //
//     // For example when you type "@jo", `text` will be `"jo"`, and
//     // you should to return an array with John and Joanna's userIds:
//     // ["john@example.com", "joanna@example.com"]

//     // const userIds = await __fetchAllUserIdsFromDB__(roomId);
//     //
//     // Return all userIds if no `text`
//     // if (!text) {
//     //   return userIds;
//     // }
//     //
//     // Otherwise, filter userIds for the search `text` and return
//     // return userIds.filter((userId) =>
//     //   userId.toLowerCase().includes(text.toLowerCase())
//     // );

//     return [];
//   },
// });


declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      // cursor: { x: number; y: number };
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      // Example, a conflict-free list
      // animals: LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      info: {
        // Example properties, for useSelf, useUser, useOthers, etc.
        // name: string;
        // avatar: string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
    // Example has two events, using a union
    // | { type: "PLAY" } 
    // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      // Example, attaching coordinates to a thread
      // x: number;
      // y: number;
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      // Example, rooms with a title and url
      // title: string;
      // url: string;
    };
  }
}





export { };
