import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { lazy, Suspense } from "react";

//Esto se hizo para mejorar el performance de la app - Con Lazy y Suspense
const IndexPage = lazy(() => import("./views/IndexPage"))
const FavoritePages = lazy(() => import("./views/FavoritePages"))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            {/* aca estamos aplicando un header el cual se muestre en todas las pestañas */}
            <Route element={<Layout/>} >
                <Route path="/" element={
                  <Suspense fallback="Cargando...">
                    <IndexPage/>
                  </Suspense>
                } index />
                <Route path="/favoritos" element={
                  <Suspense fallback="Cargando...">
                    <FavoritePages/>
                  </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
