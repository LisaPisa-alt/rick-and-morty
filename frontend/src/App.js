import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/Access/AuthRoute";
import Login from "./components/Access/Login";
import SignUp from "./components/Access/SignUp";
import CharacterList from "./components/Characters/CharacterList/CharacterList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/characters"
          element={
            <AuthRoute>
              <CharacterList />
            </AuthRoute>
          }
        />
        <Route path="*" element={<Navigate to="/characters" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
