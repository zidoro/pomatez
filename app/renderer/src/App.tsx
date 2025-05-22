import React, { Suspense, useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import {
  ThemeProvider,
  CounterProvider,
  ConnectorProvider,
} from "contexts";
import { Layout, Preloader } from "components";
import { compactRoutes, routes } from "config";
import { useAppSelector } from "hooks/storeHooks";

export default function App() {
  const settings = useAppSelector((state) => state.settings);

  useEffect(() => {
    const contextEvent = (event: MouseEvent) => {
      if (event.target) {
        let target = event.target as HTMLElement;
        if (
          target.tagName === "TEXTAREA" ||
          (target.tagName === "INPUT" &&
            (target as HTMLInputElement).type === "text")
        ) {
          return true;
        }
      }
      event.preventDefault();
      return false;
    };
    document.addEventListener("contextmenu", contextEvent);
    return () =>
      document.removeEventListener("contextmenu", contextEvent);
  }, []);

  useEffect(() => {
    const middleMouseEvent = (event: MouseEvent) => {
      if (event.button === 1) event.preventDefault();
    };
    window.addEventListener("auxclick", middleMouseEvent);

    return () =>
      window.removeEventListener("auxclick", middleMouseEvent);
  }, []);

  return (
    <ThemeProvider>
      <CounterProvider>
        <ConnectorProvider>
          <HashRouter>
            <Layout>
              <Suspense fallback={<Preloader />}>
                <Switch>
                  {settings["compactMode"]
                    ? compactRoutes.map(
                        ({ exact, path, component }, index) => (
                          <Route
                            exact={exact}
                            path={path}
                            component={component}
                            key={index}
                          />
                        )
                      )
                    : routes().map(
                        ({ exact, path, component }, index) => (
                          <Route
                            exact={exact}
                            path={path}
                            component={component}
                            key={index}
                          />
                        )
                      )}
                </Switch>
              </Suspense>
            </Layout>
          </HashRouter>
        </ConnectorProvider>
      </CounterProvider>
    </ThemeProvider>
  );
}
