'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const db = require('./db/db');

module.exports = app => {
  const { router, controller } = app;

  db(app);

  // 引入中间件
  const resource = app.middleware.resource();
  const response = app.middleware.response();
  const get_id = app.middleware.getId();
  const login = app.middleware.login();
  const auth = app.middleware.auth();
  const indexlogin = app.middleware.indexlogin();

  router.get('/', controller.home.index);

  // admin

  // 登录
  router.post('/admin/api/login', login, controller.admin.login);

  // 获取全部资源
  router.get('/admin/api/:resource', auth, response, resource, controller.admin.get_source);

  // 获取单个资源
  router.get('/admin/api/:resource/:id', auth, response, resource, get_id, controller.admin.get_source_id);

  // 更新资源
  router.put('/admin/api/:resource/:id', auth, response, resource, get_id, controller.admin.update_source);

  // 删除资源
  router.delete('/admin/api/:resource/:id', auth, response, resource, get_id, controller.admin.dele_source);

  // 创建资源
  router.post('/admin/api/:resource', auth, response, resource, controller.admin.create_source);

  // 上传图片资源
  router.post('/admin/api/upload/img', auth, response, controller.admin.uploadImg);


  // index

  // 获取文章列表
  router.get('/index/api/articles', response, controller.index.get_all_articles);

  //获取置顶文章
  router.get('/index/api/articles/top', response, controller.index.get_top_articles);

  // 获取指定页码的文章
  router.get('/index/api/articles/:pageNum', response, controller.index.get_pageNum_articles);

  // 获取文章详情，并且阅读 +1     category 外键填充
  router.get('/index/api/article/:id', response, controller.index.get_article_detail);

  // 点赞文章
  router.get('/index/api/article/fav/:id', auth, response, controller.index.fav_in_article);

  // 检查当前用户有无收藏文章
  router.get('/index/api/article/favinuser/:id', auth, response, controller.index.fav_in_user);

  // 当前用户收藏一篇文章
  router.put('/index/api/article/user/fav', auth, response, controller.index.user_fav_push);

  // 按照 create 年份 进行归类后的文章数据
  router.get('/index/api/archive', response, controller.index.get_years_articles);

  // 按照 category 进行归类后的文章数据
  router.get('/index/api/tags', response, controller.index.get_tags_articles);

  // 主页用户登录
  router.post('/index/api/login', indexlogin, controller.index.login);

  // 主页获取用户信息
  router.get('/index/api/userinfo', auth, response, controller.index.get_user_info);

  // 用户评论文章
  router.post('/index/api/comment', auth, response, controller.index.user_comment);
};
