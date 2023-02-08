import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@pomatez/ui";
import { router } from "./route.config";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
