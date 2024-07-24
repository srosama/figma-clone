import React from 'react';
import MainApp from './routes/AppRouter';
import Room from './pages/Editor/Room';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Room>
          <MainApp />
        </Room>
      </main>
    </div>
  );
};

export default App;
