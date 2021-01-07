export default {
  //获取地址栏参数
  getUrlParam(name) {
    //unescape数可对通过 escape() 编码的字符串进行解码。
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let url = window.location.href.split("#")[0];
    let search = url.split("?")[1];
    if (search) {
      var r = search.substr(0).match(reg);
      if (r !== null) return unescape(r[2]);
      return null;
    } else return null;
  },

  /**
 * 存储sessionStorage
 */
  setSessionStorage(name, content) {
    if (!name) {
      return
    }
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
  },

  /**
   * 获取sessionStorage
   */
  getSessionStorage(name) {
    if (!name) {
      return true
    } else {
      return window.sessionStorage.getItem(name)
    }
  },
  /**
   * 删除sessionStorage
   */
  removeSessionStorage(name) {
    if (!name) {
      return
    }
    window.sessionStorage.removeItem(name)
  },
  /**
 * 存储localStorage
 */
  setStore(name, content) {
    if (!name) {
      return
    }
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
   * 获取localStorage
   */
  getStore(name) {
    if (!name) {
      return true
    } else {
      return window.localStorage.getItem(name)
    }
  },

  /**
   * 删除localStorage
   */
  removeStore(name) {
    if (!name) {
      return
    }
    window.localStorage.removeItem(name)
  }
}

