import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@pomatez/ui";
import { AppProvider } from "./contexts";
import { router } from "./route.config";

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
