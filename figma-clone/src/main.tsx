import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './global.css';



ReactDOM.createRoot(document.getElementById('root')!).render(

    <AuthProvider>
      <App />
    </AuthProvider>

)

