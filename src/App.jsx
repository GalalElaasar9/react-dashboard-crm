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

function App() {
  const [theme, colorMode] = useMode();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "/team", element: <Team /> },
        { path: "/contacts", element: <Contacts /> },
        { path: "/invoices", element: <Invoices /> },
        { path: "/form", element: <Form /> },
        { path: "/calendar", element: <Calendar/> },
        { path: "/faq", element: <FAQ /> },
        { path: "/bar", element: <Bar /> },
        { path: "/line", element: <Line /> },
        { path: "/pie", element: <Pie /> },
        { path: "/geography", element: <Geography /> },
      ],
    },
  ]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
