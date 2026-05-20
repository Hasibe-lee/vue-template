
class Http {
  #baseUrl = import.meta.env.VITE_BASE_URL;

  getFetch(url) {
    const netUrl = this.#baseUrl + url;
    if (!this.#baseUrl) {
      throw new Error('请配置.env的baseUrl');
    }
    const abortController = new AbortController();
    const signal = abortController.signal;
    let p = null;
    p = fetch(netUrl, {
      signal,
    }).then(res => res.json())
      .then(result => result);
    const abort = (reason = `${url}已取消`) => abortController.abort(reason);
    p.abort = abort;
    return p;
    // return {
    //   p,
    //   abort
    // };
  }
  // constructor() {

  //  }

  get(url, ...args) {
    const resObj = this.getFetch(url, {
      method: 'GET',
      ...args
    });
    return resObj
  }
  post(url, ...args) {
    return this.getFetch(url, {
      method: 'POST',
      ...args
    });
  }
  put(url, ...args) {
    return this.getFetch(url, {
      method: 'PUT',
      ...args
    });
  }
  delete(url, ...args) {
    return this.getFetch(url, {
      method: 'DELETE',
      ...args
    });
  }
};

const SingletonHttp = useSingleton(Http);
export default new SingletonHttp();
