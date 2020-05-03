'use strict';

// 加密用的bcrypt
const bcrypt = require('bcryptjs');

// jwt token 
const jwt = require('jsonwebtoken');

const Article = require('../models/Article');
const User = require('../models/User');
const Category = require('../models/Category');
const Comment = require('../models/Comment')

const Service = require('egg').Service;

class IndexService extends Service {

    // 获取全部文章内容
    async get_all_articles() {
        return await Article.find()
    }

    // 获取置顶文章列表
    async get_top_articles() {
        return await Article.find().where({
            isTop: true                          // isTop 为 true 的
        }).sort({
            'createdAt': -1                  // 按create 时间降序返回
        });
    }

    // 获取指定页码的文章列表信息
    async get_pageNum_articles(pageNum) {
        const list = await Article.find().sort({
            'createdAd': -1                         // 按create 时间降序返回
        }).skip((pageNum - 1) * 6).limit(6)                  // 根据 pageNum skip 拿到当前页面的 6篇
            .populate('categories');                                // populate 填充外键    即原本categories _id 变为实际的 category数据 
        const count = await Article.find().lean().count();       // 获取总的 article 数量
        const totalPage = Math.ceil(count / 6);              // 计算总共有多少页
        return {
            list,                                    // 当前页面的 6篇 文章
            totalArticles: count,                  // 总共的文章数
            totalPage,                            // 总共有多少页
            currentPage: pageNum                // 当前为多少页
        }
    }

    // 获取文章内容详情
    async get_article_detail(id) {
        // 先read +1
        const pre_data = await Article.findById(id);
        const change_read = pre_data.read + 1;

        // update
        await Article.findByIdAndUpdate((id), {
            $set: { read: change_read }
        })

        //return await Article.findById(id).populate('categories');     // 根据id找到文章 ， 并且填充外键 
        return await Article.findById(id).
            populate({
                path: 'comments',
                populate: { path: 'user', select: 'username' }
            }).populate('categories')

    }

    // 处理点赞当前文章
    async fav_in_article(id) {
        const pre_data = await Article.findById(id);

        // fav +1
        const change_fav = pre_data.fav + 1;

        // update
        const res = await Article.findByIdAndUpdate(id, {
            $set: { fav: change_fav }
        });

        //console.log(res);

        return '点赞成功'
    }

    // 根据年份返回文章列表
    async get_years_articles() {
        return await Article.aggregate([            // aggregate 聚合  一层一层地处理数据
            {
                $lookup: {                         // 连接 categories 获取具体数据   (populate)
                    from: 'categories',       // 需要关联查找的集合名
                    localField: 'categories',  // 本集合中用于查找的字段
                    foreignField: '_id',      // 关联集合中，对应本集合需要查找的字段
                    as: 'Category-List'          // 查找输出的新字段名
                }
            },
            {
                $group: {                        // 将集合中的文档分组      最终的返回的数组中的单个集合
                    _id: {                     // _id  =>  createdAt 的年份
                        $year: '$createdAt'
                    },
                    count: { $sum: 1 },           // _id 年份文章的 总数
                    list: {                     // 文章列表
                        $push: {                             // 在结果文档中插入值到一个数组
                            _id: '$_id',
                            title: '$title',
                            summary: '$summary',
                            categories: '$Category-List',           // 前一层处理的  as: 'newList'   即填充数据后的categories
                            createdAt: '$createdAt',
                        }
                    }
                }
            },
            { $sort: { _id: -1 } }               // 按照 _id 降序排序  即按照年份降序排序
        ]);
    }

    // 根据标签分类返回文章列表
    async get_tags_articles() {
        return await Category.aggregate([
            {
                $lookup: {                                         // 连接 articles 获取具体数据 
                    from: 'articles',                // 需要关联查找的集合名
                    localField: '_id',              // 本集合中用于查找的字段
                    foreignField: 'categories',        // 关联集合中，对应本集合需要查找的字段 
                    as: 'List'                 // 查找输出的新字段名
                }
            }
        ]);
    }

    // 处理登录操作
    async login(username, password) {
        // 查询user， 带上password返回
        const user = await User.findOne({ username }).select('+password');
        // 找不到user
        if (!user) {
            return '用户名错误'
        };

        // 验证密码是否正确
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return '密码错误'
        };

        // 根据用户的 _id 生成jwt token并返回

        // 拿到key                    config.keys.split('_')[1];
        const key = this.app.config.keys.split('_')[1];
        // 加密
        const token = jwt.sign({ id: user._id }, key);
        return {
            message: '登录成功',
            user: user._id,
            username: user.username,
            token: token
        }
    }

    // 获取用户信息
    async get_user_info(user) {
        const data = await User.findById(user).populate('fav');
        //console.log(data);
        return data
    }

    // 添加评论
    async user_comment(post_data) {

        // 先增加comment数据，再操作article数据
        const result1 = await Comment.create(post_data);

        // 现根据article _id 获取文章内容
        const article_pre_data = await Article.findById(post_data.article)

        // comments
        const article_pre_comments = article_pre_data.comments;

        // push 更改
        article_pre_comments.push(result1._id);
        let article_new_comments = article_pre_comments;

        // update
        const result2 = await Article.findByIdAndUpdate(post_data.article, {
            $set: { comments: article_new_comments }
        });

        // 返回更改后的数据  并且要populate
        const article_detail = await Article.findById(post_data.article).populate('categories')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'username' }
            });

        return {
            message: '评论成功',
            data: article_detail
        }
    }

    // 判断当前用户是否收藏当前文章
    async fav_in_user(user_id, article_id) {
        const user_data = await User.findById(user_id, 'fav');
        // fav
        const user_fav = user_data.fav;
        //console.log(user_fav);

        // some判断
        const bool = user_fav.some(art => art == article_id);
        //console.log(bool);

        return bool
    }

    // 更改当前用户对当前文章的收藏状态
    async user_fav_change(article_id, user_id, user_fav_change) {
        if (user_fav_change) {
            // 收藏此文章
            const user_data = await User.findById(user_id, 'fav');
            // fav数组中添加当前文章_id
            user_data.fav.push(article_id);

            const new_user_fav = user_data.fav;
            //console.log(new_user_fav);

            // update
            const result = await User.findByIdAndUpdate(user_id, {
                $set: { fav: new_user_fav }
            });
            if (result) {
                return {
                    message: '收藏成功',
                    result: result
                }
            }
            return 'error'
        }

        // 取消收藏此文章
        const user_data = await User.findById(user_id, 'fav');
        const user_fav = user_data.fav;

        // find index
        const index = user_fav.findIndex(art => art == article_id);
        //console.log(index);

        // 更改fav数组
        user_fav.splice(index, 1);
        //console.log(user_fav);

        // update
        const result = await User.findByIdAndUpdate(user_id, {
            $set: { fav: user_fav }
        });
        //console.log(result);

        if (result) {
            return {
                message: '取消收藏成功',
                result: result
            }
        }
        return 'error'
    }
}

module.exports = IndexService;
