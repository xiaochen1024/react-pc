import { observable, action } from "mobx";

export default class testStore {
  @observable count = 0;

  @action
  add = async => {
    this.count += 1;
  };
}
