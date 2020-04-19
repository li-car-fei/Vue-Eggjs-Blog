/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587115298328_9492';

  // // add your middleware config here
  // config.middleware = ['auth'];
  // // 设置中间件匹配路由
  // config.auth = {
  //   enable: true,   // 是否开启路由
  //   match: ['/admin']       // 只匹配指定路由
  // };



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };


  // 先将csrf取消
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    //domainWhiteList: [ 'http://localhost:8080' ],
  };

  // 配置cors 解决跨域问题
  config.cors = {
    credentials: true,
    origin: 'http://localhost:8081', // 匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return {
    ...config,
    ...userConfig,
  };
};
