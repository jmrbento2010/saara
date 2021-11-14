import { AuthProvider } from './contexts/auth';
import { AppRoutes } from './routes/Routes'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
