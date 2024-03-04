import Dashboard from "./containers/dashboard";
import Web from "./containers/web";
import { Route, Routes } from 'react-router-dom';
import { Provider } from "./context/GlobalContext";
import { ProtectedRoute } from "./components/ProtecctedRoute";

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
    </Provider>
  );
}

export default App;
