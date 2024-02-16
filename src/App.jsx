import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersList from "./pages/UsersList";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:userName" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
