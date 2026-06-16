import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddInquiry from "./pages/AddInquiry";
import InquiryList from "./pages/InquiryList";
import UploadExcel from "./pages/UploadExcel";
import AddNote from "./pages/AddNote";
import ViewInquiry from "./pages/ViewInquiry";
import TodayFollowup from './pages/Todayfollowup';

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public (NO Navbar) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* 🔐 Private (WITH Navbar) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/addinquiry"
          element={
            <PrivateRoute>
              <AddInquiry />
            </PrivateRoute>
          }
        />

        <Route
          path="/inquirylist"
          element={
            <PrivateRoute>
              <InquiryList />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-note/:id"
          element={
            <PrivateRoute>
              <AddNote />
            </PrivateRoute>
          }
        />

        <Route
          path="/inquiry/:id"
          element={
            <PrivateRoute>
              <ViewInquiry />
            </PrivateRoute>
          }
        />

        <Route
          path="/uploadinquiry"
          element={
            <PrivateRoute>
              <UploadExcel />
            </PrivateRoute>
          }
        />

        <Route
          path="/today-followups"
          element={
            <PrivateRoute>
              <TodayFollowup />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;