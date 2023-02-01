import React, { ReactNode } from "react";
import {
  NavProvider,
  ThemeProvider,
  ViewportProvider,
} from "../../context";
import { StyledLayout } from "../../styles";
import { Navbar } from "../navigation";
import { Sidebar } from "../sidebar";
import { Footer } from "../footer";

type Props = { children?: ReactNode };

export function PageLayout({ children }: Props) {
  return (
    <ThemeProvider>
      <ViewportProvider>
        <NavProvider>
          <StyledLayout>
            <Navbar />
            <Sidebar />
            <main>{children}</main>
            <Footer />
          </StyledLayout>
        </NavProvider>
      </ViewportProvider>
    </ThemeProvider>
  );
}
