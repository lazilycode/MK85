'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1490750627161_5967';

  config.middleware = [ 'errorHandler' ];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:9527','http://10.52.24.53:9527']
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  //mysql 
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '111.231.94.121',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
