import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@pomatez/ui";
import {
  AppProvider,
  ElectronProvider,
  SyncDataProvider,
} from "./contexts";
import { router } from "./route.config";

function App() {
  return (
    <AppProvider>
      <SyncDataProvider>
        <ElectronProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </ElectronProvider>
      </SyncDataProvider>
    </AppProvider>
  );
}

export default App;
