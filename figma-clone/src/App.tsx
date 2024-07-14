import React from 'react';
import MainApp from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <MainApp />
      </main>
    </div>
  );
};

export default App;
