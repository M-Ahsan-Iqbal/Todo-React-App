import './App.css';
import Counter from "./components/counter";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Signup from './components/signup';
import Tasks from './components/tasks';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/tasks" element={
            <ProtectedRoute>
              <Tasks/>
            </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login/>}/>

          {/* Redirect default route to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
