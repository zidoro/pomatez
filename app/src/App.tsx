import React, { Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, CounterProvider, ElectronProvider } from "contexts";
import { Layout, Preloader } from "components";
import { routes } from "config";

export default () => {
  return (
    <ElectronProvider>
      <ThemeProvider>
        <CounterProvider>
          <Router>
            <Layout>
              <Suspense fallback={<Preloader />}>
                <Switch>
                  {routes.map(({ exact, path, component }, index) => (
                    <Route
                      exact={exact}
                      path={path}
                      component={component}
                      key={index}
                    />
                  ))}
                </Switch>
              </Suspense>
            </Layout>
          </Router>
        </CounterProvider>
      </ThemeProvider>
    </ElectronProvider>
  );
};
