import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home/home";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.HOME} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
