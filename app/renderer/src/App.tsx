import React, { Suspense } from "react";
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
