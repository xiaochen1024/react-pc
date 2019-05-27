const storage = {};
export default {
  localStorageEnable: true,

  setItem(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (ex) {
      this.localStorageEnable = false;
      storage.k = v;
    }
  },

  getItem(k) {
    try {
      if (this.localStorageEnable) {
        return localStorage.getItem(k);
      }
      return storage.k;
    } catch (ex) {
      return storage.k;
    }
  },

  removeItem(k) {
    try {
      localStorage.removeItem(k);
    } catch (ex) {
      this.localStorageEnable = false;
    }
  }
};
