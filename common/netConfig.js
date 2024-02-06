import {activeConfig} from "./appConfig";
const config = {
  isMockApi: false,
  // requestUrl: ["https://360-im.oss-cn-hongkong.aliyuncs.com/config_sys/domains-uat.txt"],//测试
  requestUrl: activeConfig.requestUrl,//线上
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
  requestRemoteIp: (commit) => {
    if (config.RemoteIpInited)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      var i = Math.floor((Math.random() * config.requestUrl.length));
      uni.request({
        url: config.requestUrl[i],
        success: (response) => {
          //todo 测试
          // config.baseUrl.pro = response.data.data.path;
          let res_data = eval(response.data);
          config.httpDomains.url = res_data.httpDomains;
          config.mediaDomains.url = res_data.mediaDomains;
          config.websocketDomains.url = res_data.websocketDomains;
          config.RemoteIpInited = true;
          //更新domain
          commit("app/setImgDomain",res_data.mediaDomains,{root:true});
          commit("app/setReqDomain",res_data.httpDomains,{root:true});
          commit("app/setSocketDomain",res_data.websocketDomains,{root:true});
          resolve(config)
        },
        fail: (error) => {
          config.RemoteIpInited = true;
          reject(error)
        }
      })
    });
  }
}

export default config
