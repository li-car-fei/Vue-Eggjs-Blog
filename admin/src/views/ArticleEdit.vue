<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}文章</h3>
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="model.summary"></el-input>
      </el-form-item>
      <el-form-item label="阅读量">
        <el-input-number v-model="model.read"></el-input-number>
      </el-form-item>
      <el-form-item label="点赞量">
        <el-input-number v-model="model.fav"></el-input-number>
      </el-form-item>
      <el-form-item label="分类">
        <el-select multiple v-model="model.categories" placeholder="请选择文章分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论">
        <el-select multiple v-model="model.comments" placeholder="请选择评论">
          <el-option
            v-for="item in comments"
            :key="item._id"
            :label="item.content"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="置顶">
        <el-switch v-model="model.isTop" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="正文">
        <mavon-editor
          :toolbars="toolbars"
          @imgAdd="handleEditorImgAdd"
          @save="saveDoc"
          style="height:600px"
          v-model="model.MdContent"
          ref="md"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { require: true }
  },
  data() {
    return {
      categories: [],
      model: {},
      comments: [],

      // markdown 工具栏参数设置
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: false, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },

  methods: {
    async save() {
      // 先保存markdown原本的内容以及编译后的内容
      this.model.body = this.$refs.md.d_render;
      let res;
      if (!this.id) {
        res = await this.$http.post("/article", this.model);
      } else {
        res = await this.$http.put(`/article/${this.id}`, this.model);
      }
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: res.data
        });

        this.$router.push("/articles/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("/category");
      this.categories = res.data;
    },
    async fetchComments() {
      const res = await this.$http.get("/comment");
      this.comments = res.data;
    },

    saveDoc(value, render) {
      this.model.MdContent = value;
      this.model.body = render;
    },

    //上传图片接口pos 表示第几个图片
    handleEditorImgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$http.post("/markdown/upload/img", formdata).then(res => {
        var url = res.data;
        this.$refs.md.$img2Url(pos, url); //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
      });
    }
  },
  created() {
    this.fetchComments();
    this.fetchCategories();
    this.id && this.fetchDetail();
  }
};
</script> 