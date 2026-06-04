import AppRoutes from './routes/AppRoutes.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ToastProvider } from './components/common/Toast.jsx';

function App() {
  return (
    <ToastProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </ToastProvider>
  );
}

export default App;
