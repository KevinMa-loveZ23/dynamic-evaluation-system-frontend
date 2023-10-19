import { store } from "@/store/store";
class HttpAction {
  static baseUrl = store.baseUrl;
  static defaultErrMsg = "抱歉，操作失败，请重试";
  init() {
    this._generalUrl = HttpAction.baseUrl;
    this._method = null;
    this._headers = null;
    this._body = null;
    this.setUrl = false;
    this.setMethod = false;
    // this.setHeaders = false;
    this.setHeaders = true;
    this.setBody = false;
  }
  // constructor(url, method, headers, rawBody) {
  //     this.init()
  //     this._generalUrl += url
  //     this._method = method
  //     this._headers = headers
  //     this._body = JSON.stringify(rawBody)
  // }
  constructor() {
    this.init();
    // console.log(store.getters.token);
    // if (store.getters.token) {
    //   this.headers({
    //     token: store.getters.token,
    //   });
    // } else {
    //     this.headers(null)
    // }
  }

  // url(url) {
  //     this._generalUrl = Action.baseUrl + url
  //     this.setUrl = true
  // }
  // 可以重复地调用url()来添加路径，或一次性添加
  // 注意：get-query已经在Get类中实现
  url(...paths) {
    paths.map((path) => {
      this._generalUrl += "/" + String(path);
    });
    this.setUrl = true;
    return this;
  }

  method(method) {
    this._method = method;
    this.setMethod = true;
    return this;
  }

  headers(headers) {
    this._headers = headers;
    this.setHeaders = true;
    return this;
  }

  bodyObject(rawBody) {
    if (rawBody) {
      this._body = JSON.stringify(rawBody);
    } else {
      this._body = null;
    }
    this.setBody = true;
    return this;
  }

  isReady() {
    return this.setUrl && this.setMethod && this.setHeaders && this.setBody;
  }
  async send() {
    if (!this.isReady()) {
      const error = new Error(
        "incompleted arguments! check your actions before."
      );
      throw error;
    }
    let fetchArgs = {
      method: this._method,
    };
    if (this._headers) {
      fetchArgs.headers = this._headers;
    }
    if (this._body) {
      fetchArgs.body = this._body;
      if (!fetchArgs.headers) {
        fetchArgs.headers = {};
      }
      fetchArgs.headers["Content-Type"] = "application/json";
    }
    console.log("URL:" + this._generalUrl)
    const response = await fetch(this._generalUrl, fetchArgs);
    const responseData = await response.json();
    if (!response.ok || responseData.code != 200) {
      const error = new Error(responseData.message || HttpAction.defaultErrMsg);
      throw error;
    }
    return responseData.data;
    // fetch(this._generalUrl, fetchArgs)
    //     .then(response => {
    //         const responseData = response.json()
    //         if (!response.ok) {
    //             const error = new Error(
    //                 responseData.message || Action.defaultErrMsg
    //             )
    //             throw error
    //         }
    //         return responseData
    //     })
    //     .then(responseData => {
    //         if (optional) {
    //             doWithResp(responseData, optional)
    //         }
    //         else {
    //             doWithResp(responseData)
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
  }
  async sendWith(doWithResp, ...optional) {
    // Deprecated
    const responseData = await this.send();
    let retVal;
    if (optional) {
      retVal = doWithResp(responseData, optional);
    } else {
      retVal = doWithResp(responseData);
    }
    return retVal;
  }
}

class Get extends HttpAction {
  constructor() {
    super();
    super.method("GET");
    super.bodyObject(null);
    this.queryUrl = "";
    this.queryAdded = false;
  }
  method(method) {
    method = "GET";
    super.method(method);
  }
  bodyObject(rawBody) {
    rawBody = null;
    super.bodyObject(rawBody);
  }
  // 注意：get-query已实现如下
  // addQuery是保存操作，但不检查url是否已填写完成
  // 虽然实现上可以在addQurey后再添加再保存，但...
  query(name, value) {
    let queryPairStr = String(name) + "=" + String(value);
    if (this.queryUrl || this.queryAdded) {
      this.queryUrl += "&";
    } else {
      this.queryUrl = "?";
    }
    this.queryUrl += queryPairStr;
    return this;
  }
  addQuery() {
    this._generalUrl += this.queryUrl;
    this.queryUrl = "";
    this.queryAdded = true;
    return this;
  }
}
class Post extends HttpAction {
  constructor() {
    super();
    super.method("POST");
  }
  method(method) {
    method = "POST";
    super.method(method);
  }
}
class Put extends HttpAction {
  constructor() {
    super();
    super.method("PUT");
  }
  method(method) {
    method = "PUT";
    super.method(method);
  }
}
class Delete extends HttpAction {
  constructor() {
    super();
    super.method("DELETE");
  }
  method(method) {
    method = "DELETE";
    super.method(method);
  }
}

export { Get, Post, Put, Delete };