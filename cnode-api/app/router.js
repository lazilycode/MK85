'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/user', controller.user.info);
  router.get('/Alldata', controller.user.allData);
  router.get('/test', controller.user.test);
};
