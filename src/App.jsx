import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

import Layout from "../src/components/Layout/Layout";
import Dashboard from "./components/scenes/dashboard/Dashboard";
import Team from "./components/scenes/Team/Team";
import Contacts from "./components/scenes/Contacts/Contacts";
import Invoices from "./components/scenes/Invoices/Invoices";
import Form from "./components/scenes/Form/Form";
import Calendar from "./components/scenes/Calendar/Calendar";
import FAQ from "./components/scenes/Faq/Faq";
import Bar from "./components/scenes/Bar/Bar";
import Line from "./components/scenes/Line/Line";
import Pie from "./components/scenes/Pie/Pie";
import Geography from "./components/scenes/Geo/Geo";
import Products from "./components/scenes/Products/Products";
import ProductDetails from "./components/scenes/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import AuthContextProvider from "./Context/AuthContextProvider";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Brands from "./components/scenes/Brands/Brands";
import Category from "./components/scenes/Category/Category";
import ProductsContextProvider from "./Context/ProductsContextProvider";
import BrandContextProvider from "./Context/BrandContextProvider";
import CategoryContextProvider from "./Context/CategoryContextProvider";

let clientQuery = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productDetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/team",
          element: (
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          ),
        },
        {
          path: "/contacts",
          element: (
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/invoices",
          element: (
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          ),
        },
        {
          path: "/form",
          element: (
            <ProtectedRoute>
              {" "}
              <Form />
            </ProtectedRoute>
          ),
        },
        {
          path: "/calendar",
          element: (
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          ),
        },
        {
          path: "/faq",
          element: (
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          ),
        },
        {
          path: "/bar",
          element: (
            <ProtectedRoute>
              <Bar />
            </ProtectedRoute>
          ),
        },
        {
          path: "/line",
          element: (
            <ProtectedRoute>
              <Line />
            </ProtectedRoute>
          ),
        },
        {
          path: "/pie",
          element: (
            <ProtectedRoute>
              <Pie />
            </ProtectedRoute>
          ),
        },
        {
          path: "/geography",
          element: (
            <ProtectedRoute>
              <Geography />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={clientQuery}>
        <ProductsContextProvider>
          <BrandContextProvider>
            <CategoryContextProvider>
              <ReactQueryDevtools />{" "}
              {/* خاصة بعرض التغيرات الخاصة بعرض الداتا */}
              <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Toaster />
                  <RouterProvider router={router} />
                </ThemeProvider>
              </ColorModeContext.Provider>
            </CategoryContextProvider>
          </BrandContextProvider>
        </ProductsContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
