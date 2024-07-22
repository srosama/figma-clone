import React from 'react';
import MainApp from './routes/AppRouter';
import { LiveblocksProvider, RoomProvider } from '@liveblocks/react';
const public_Key = import.meta.env.VITE_LIVEBLOCK_API;

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
      <LiveblocksProvider publicApiKey={public_Key}>
        <RoomProvider id='figma-clone'>
            <MainApp />
        </RoomProvider>
      </LiveblocksProvider>
      </main>
    </div>
  );
};

export default App;
