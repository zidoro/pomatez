import React from "react";
import { StyledLayout } from "../styles";
import {
  ThemeProvider,
  ViewportProvider,
  NavProvider,
} from "../contexts";

import Navigation from "./Navigation";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <ViewportProvider>
        <NavProvider>
          <StyledLayout>
            <Navigation />
            <Sidebar />

            <main>{children}</main>

            <Footer />
          </StyledLayout>
        </NavProvider>
      </ViewportProvider>
    </ThemeProvider>
  );
};

export default Layout;
