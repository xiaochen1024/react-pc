import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
// import { renderRoutes } from "react-router-config";
import renderRoutes from "utils/renderRoutes";
import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

import asyncComponent from "common/AsyncComponent";
import "./index.less";

import testStore from "stores/testStore";

const history = createBrowserHistory();
const stores = {
  testStore: new testStore()
};
const routes = [
  {
    path: "/",
    component: asyncComponent(() => import("pages/Home"))
  }
];

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider {...stores}>
      <Router history={history}>{renderRoutes(routes)}</Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById("root")
);
