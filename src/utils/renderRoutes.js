import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import storage from "utils/storage";
import { LOGIN_INFO, MENU } from "constants";

const renderRoutes = function(routes) {
  const { pathname } = window.location;
  const menus = JSON.parse(storage.getItem(MENU)) || [];
  const loginInfo = JSON.parse(storage.getItem(LOGIN_INFO)) || {};

  const findIterator = arr => {
    return arr.find(v => {
      if (v.path && v.path === pathname) {
        return v;
      } else {
        return v.children && findIterator(v.children);
      }
    });
  };
  const findFirseMenu = arr => {
    return arr.find(v => {
      if (v.path) {
        return v;
      } else {
        return v.children && findIterator(v.children);
      }
    });
  };

  if (pathname !== "/login" && !loginInfo.token) {
    window.location.replace("/login");
    return;
  }
  let hasMenuAuth = undefined;
  if (pathname === "/login") {
    hasMenuAuth = "/login";
  } else if (pathname === "/") {
    hasMenuAuth = "/";
  } else {
    hasMenuAuth = findIterator(menus);
  }
  if (!hasMenuAuth) {
    const firseMenu = findFirseMenu(menus);
    window.location.href = firseMenu ? firseMenu.path : "/login";
    return;
  } else {
    return (
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={props => <route.component {...props} route={route} />}
          />
        ))}
      </Switch>
    );
  }
};

export default renderRoutes;
