import React, { Component } from "react";
import { Button } from "antd";
import { inject, observer } from "mobx-react";
import { renderRoutes } from "react-router-config";

import "./Home.less";

@inject(stores => ({
  testStore: stores.testStore
}))
@observer
class Home extends Component {
  render() {
    const { testStore, route } = this.props;
    return (
      <div className="homePage">
        <div>{testStore.count}</div>
        <Button onClick={testStore.add}>add</Button>
        <div>{renderRoutes(route.routes)}</div>
      </div>
    );
  }
}

export default Home;
