import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@pomatez/ui";
import { ElectronProvider } from "./contexts";
import { router } from "./route.config";

function App() {
  return (
    <ElectronProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ElectronProvider>
  );
}

export default App;
