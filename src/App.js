import Dashboard from "./containers/dashboard";
import Web from "./containers/web";
import { Route, Routes } from 'react-router-dom';
import { Provider } from "./context/GlobalContext";
import { ProtectedRoute } from "./components/ProtecctedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Web />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </Provider>
  );
}

export default App;
