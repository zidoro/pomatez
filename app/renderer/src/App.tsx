import React, { Suspense, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  ThemeProvider,
  CounterProvider,
  ConnectorProvider,
} from "contexts";
import { Layout, Preloader } from "components";
import { compactRoutes, routes } from "config";
import { useSelector } from "react-redux";
import { AppStateTypes } from "store";

export default function App() {
  const settings = useSelector(
    (state: AppStateTypes) => state.settings
  );

  useEffect(() => {
    const contextEvent = (event: MouseEvent) => {
      if (event.target) {
        let target = event.target as HTMLElement;
        if (target.tagName === "TEXTAREA") {
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

  return (
    <ThemeProvider>
      <CounterProvider>
        <ConnectorProvider>
          <Router>
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
                    : routes.map(
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
          </Router>
        </ConnectorProvider>
      </CounterProvider>
    </ThemeProvider>
  );
}
