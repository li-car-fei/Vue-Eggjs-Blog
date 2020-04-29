'use strict';

const Article = require('../models/Article');
//const User = require('../models/User');
const Category = require('../models/Category');

const Service = require('egg').Service;

class IndexService extends Service {
    async get_all_articles() {
        return await Article.find()
    }

    async get_top_articles() {
        return await Article.find().where({
            isTop: true                          // isTop 为 true 的
        }).sort({
            'createdAt': -1                  // 按create 时间降序返回
        }).limit(6);
    }

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

    async get_article_detail(id) {
        const pre_data = await Article.findById(id);
        const change_read=pre_data.read+1;
        await Article.findByIdAndUpdate((id),{
            $set:{read:change_read}
        })

        return await Article.findById(id).populate('categories');     // 根据id找到文章 ， 并且填充外键 
    }

    async fav_in_article(id){
        const pre_data = await Article.findById(id);
        const change_fav=pre_data.fav+1;

        const res=await Article.findByIdAndUpdate((id),{
            $set:{fav:change_fav}
        });

        console.log(res);

        return '点赞成功'
    }

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
}

module.exports = IndexService;
