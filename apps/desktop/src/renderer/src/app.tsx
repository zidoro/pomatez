import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@pomatez/ui";
import { AppProvider, ElectronProvider } from "./contexts";
import { router } from "./route.config";

function App() {
  return (
    <AppProvider>
      <ElectronProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ElectronProvider>
    </AppProvider>
  );
}

export default App;
