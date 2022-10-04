import store from "../store"//使用vuex对状态进行管理

const config = {
  isMockApi: false,
  requestUrl: ["https://360-im.oss-cn-hongkong.aliyuncs.com/config_sys/domains.txt"],
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
  requestRemoteIp: () => {
    console.log("config:", config)
    if (config.RemoteIpInited)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      var i = Math.floor((Math.random() * config.requestUrl.length));
      uni.request({
        url: config.requestUrl[i],
        success: (response) => {

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

          console.log('res_N2--'+"22222")
          config.RemoteIpInited = true;
          resolve()
        }
      })
    });
  }
}

export default config
