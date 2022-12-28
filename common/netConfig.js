import store from "../store"//使用vuex对状态进行管理
const config = {
  isMockApi: false,
 requestUrl: [
     "https://config.7v7plw.xyz/config_sys/domains-prod.txt",
  "https://config.zlqcot.xyz/config_sys/domains-prod.txt",
  "https://config.mhelz2.xyz/config_sys/domains-prod.txt",
  "https://config.2ypoxu.xyz/config_sys/domains-prod.txt",
  "https://config.4mtfa6.xyz/config_sys/domains-prod.txt",
  "https://config.ua5q6u.xyz/config_sys/domains-prod.txt",
  "https://config.l4xo71.xyz/config_sys/domains-prod.txt",
  "https://config.ox6sdh.xyz/config_sys/domains-prod.txt",
  "https://config.5x4kgn.xyz/config_sys/domains-prod.txt",
  "https://config.l8x754.xyz/config_sys/domains-prod.txt",
     "https://media.33fwj.pw (http://media.33fwj.pw/)/config_sys/domains-prod.txt",
     "https://media.8jkiy.pw (http://media.8jkiy.pw/)/config_sys/domains-prod.txt"
     "https://media.ve9gj.pw (http://media.ve9gj.pw/)/config_sys/domains-prod.txt"
     "https://live1-im.oss-cn-hongkong.aliyuncs.com/config_sys/domains-prod.txt"
  "https://config.jsrmz6.xyz/config_sys/domains-prod.txt"], //约伴线上 域名映射 oss
  httpDomains: {
    url: [],//这个暂时没用，当初设计是接受参数用的
  },
  mediaDomains: {
    url: [],//这个暂时没用，当初设计是接受参数用的
  },
  websocketDomains: {
    url: [],//这个暂时没用，当初设计是接受参数用的
  },
  uuid: Math.random().toString(36).substring(3, 20),
  requestCount : 0, //默认请求次数id
  requestRemoteIp: () => {
    if (config.RemoteIpInited)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      // var i = Math.floor((Math.random() * config.requestUrl.length));//2022.12.19 abandoned
      var i = config.requestCount;
      uni.request({
        url: config.requestUrl[i],
        success: (response) => {
        // requestCount will not change at this response.
          console.log('res_N1--'+"11111")
          //todo 测试
          // config.baseUrl.pro = response.data.data.path;
          let res_data = eval(response.data);
          config.httpDomains.url = res_data.httpDomains;
          config.mediaDomains.url = res_data.mediaDomains;
          config.websocketDomains.url = res_data.websocketDomains;
          config.RemoteIpInited = true;
          console.log('res_N11111--'+res_data.websocketDomains)
          //更新domain
          store.commit("setImgDomain",res_data.mediaDomains);
          store.commit("setReqDomain",res_data.httpDomains);
          store.commit("setSocketDomain",res_data.websocketDomains);
          resolve(config)
        },
        fail: () => {
          // requestCount+1 if request failed.
          config.requestCount++
          this.requestRemoteIp()
          console.log('res_N2--'+"22222")
          config.RemoteIpInited = true;
          resolve()
        },
        catch: () => {
        // requestCount+1 if request failed.
        config.requestCount++
        this.requestRemoteIp()
          console.log('res_N3--'+"33333")
        config.RemoteIpInited = true;
        resolve()
      }
      })
    });
  }
}

export default config
