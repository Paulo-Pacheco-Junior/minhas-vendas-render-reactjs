import { Routes, Route } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { NewSale } from "../pages/NewSale";
import { EditSale } from "../pages/EditSale";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/new-sale" element={<NewSale />} />
      <Route path="/edit-sale/:id" element={<EditSale />} />
    </Routes>
  );
}
