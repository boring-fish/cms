<template>
  <div class="edit-warp content-container">
    <div class="content-header">
      <div class="left-panel">
        <div class="panel-item">
          <Button type="primary" icon="ios-arrow-back" @click="back">返回</Button>
        </div>
        <div class="panel-item">
          <span>{{ pageTitle }}</span>
        </div>
      </div>
      <div class="right-panel">
        <div class="panel-item">
          <Button type="primary" icon="ios-paper-plane-outline" @click="saveAndPublish">发布</Button>
        </div>
        <div class="panel-item">
          <Button type="primary" icon="md-book" @click="preview">预览</Button>
        </div>
        <div class="panel-item">
          <Button type="primary" icon="md-add" @click="saveArticle">保存</Button>
        </div>
      </div>
    </div>
    <div class="content-body no-pagination">
      <Modal
        v-model="backModal"
        class="back-modal"
        title="提示"
        width="400"
        @on-ok="backModalOnOk"
      >
        <div class="back-modal-content">
          <Icon type="ios-alert"/>
          <p>您还没保存编辑，是否确定返回到上一页？</p>
        </div>
      </Modal>
      <div class="art-title">
        <Form label-position="top" ref="articleContent" :model="articleContent">
          <FormItem label="标题" prop="title">
            <Input v-model="articleContent.title"></Input>
          </FormItem>
          <FormItem label="封面图" prop="cover" class="upload-form">
            <Upload
              v-model="articleContent.cover"
              type="drag"
              accept=".png,.jpg,.jpeg"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :show-upload-list="false"
              :before-upload="onBeforeUpload"
              v-show="!coverImgUrl"
              action="https://wk-1258302538.cos.ap-nanjing.myqcloud.com">
              <div class="upload-box">
                <Icon type="ios-camera" size="68"></Icon>
              </div>
            </Upload>
            <div class="cover-preview" v-show="coverImgUrl">
              <img :src="coverImgUrl" alt="">
              <div class="cover-preview-mask">
                <!-- <Icon type="ios-eye-outline" @click.native=""></Icon> -->
                <Icon type="ios-trash-outline" @click.native="delCover"></Icon>
              </div>
            </div>
          </FormItem>
        </Form>
      </div>
      <div class="art-content">
        <Form label-position="top">
          <FormItem label="文章内容" prop="ui_model">
          </FormItem>
        </Form>
        <vue-neditor-wrap v-model="articleContent.ui_model" :config="myConfig" class="ueditor-wrap"></vue-neditor-wrap>
        <!-- <vue-ueditor-wrap v-model="articleContent.ui_model" :config="myConfig" class="ueditor-wrap"></vue-ueditor-wrap> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueNeditorWrap from 'vue-neditor-wrap';
import VueUeditorWrap from 'vue-ueditor-wrap';

import axios from 'axios';
import { saveLocal } from '@/utils/utils';
let COS = require('cos-js-sdk-v5');
Component.registerHooks([
  'beforeRouteLeave' // for vue-router 2.2+
]);
@Component({
  components: {
    VueNeditorWrap,
    VueUeditorWrap
  },
})

export default class Edit extends Vue {
  backModal: boolean = false;
  isOk: boolean = false;
  articleContent: any = {
    title: '',
    ui_model: '',
    cover: ''
  };
  ajaxMethod: string = '';
  pageTitle: string = '新建图文';
  myConfig = {
    autoHeightEnabled: false,
    initialFrameHeight: 700,
    initialFrameWidth: '100%',
    // serverUrl: 'http://35.201.165.105:8000/controller.php',
    // serverUrl: 'http://121.36.215.36/php/controller.php',
    serverUrl: 'https://service-017grgna-1258302538.gz.apigw.tencentcs.com/test/uploadImage',
    // serverUrl: 'https://service-017grgna-1258302538.gz.apigw.tencentcs.com/test/uploadImage',
    UEDITOR_HOME_URL: '/neditor/',
  };
  coverImg: any = '';
  coverImgUrl: any = '';

  onBeforeUpload(file: any) {
    console.log('coverfile', file);
    this.coverImg = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.coverImgUrl = reader.result;
    };
    return false;
  }

  uploadCover(file: any) {
    return new Promise( (resolve, reject) => {
      if ( !file ) {  
        resolve('NO_IMG');
        return;
      }
      let cos = new COS({
        getAuthorization: function(options: any, callback: any) {
          $api.editorService.uploadToken().then(res => {
            let credentials = res.credentials;
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.sessionToken,
              StartTime: res.startTime,
              ExpiredTime: res.expiredTime,
            });
          });
        }
      });
      console.log(cos);
      (this.$Spin as any).show({
        render: (h: any) => {
          return h('div', [
            h('Icon', {
                'class': 'spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
            }),
            h('div', 'Loading')
          ]);
        }
      });
      let that = this;
      cos.putObject({
        Bucket: 'wk-1258302538',
        Region: 'ap-nanjing',
        Key: `/cms/${file.name}`,
        Body: file
      }, function(err: any, data: any) {
        (that.$Spin as any).hide();
        if ( data ) {
          resolve(data);
        }
        if ( err ) {
          reject(err);
        }
      });
    });
  }

  delCover() {
    this.coverImg = '';
    this.coverImgUrl = '';
  }

  back() {
    this.backModal = true;
  }
  
  backModalOnOk() {
    this.isOk = true;
    this.$router.push('/list');
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.backModal = true;
    if ( this.isOk ) {
      next();
    }
  }

  saveArticle(valid: any) {
    if ( !this.articleContent.title ) {
      this.$Message.error('请输入文章标题');
    } else if ( !this.coverImg && !this.coverImgUrl ) {
      this.$Message.error('请上传封面图');
    } else if ( !this.articleContent.ui_model ) {
      this.$Message.error('请输入文章内容');
    } else {
      let body = {
        model: this.articleContent.ui_model,
        title: this.articleContent.title,
        articleId: this.$route.params.id,
        cover: this.articleContent.cover,
        active: 'DRAFT'
      };
      this.uploadCover(this.coverImg).then((res: any) => {
        if ( res !== 'NO_IMG' ) {
          this.articleContent.cover = res.Location;
          body.cover = res.Location;
        }
        this.saveArticlePromise(this.ajaxMethod, body).then((res) => {
          this.ajaxMethod = 'PUT';
          this.$Message.success('保存成功');
        });
      });
    }

  }

  saveAndPublish() {
    if ( !this.articleContent.title ) {
      this.$Message.error('请输入文章标题');
    } else if ( !this.coverImg && !this.coverImgUrl ) {
      this.$Message.error('请上传封面图');
    } else if ( !this.articleContent.ui_model ) {
      this.$Message.error('请输入文章内容');
    } else {
      let body = {
        model: this.articleContent.ui_model,
        title: this.articleContent.title,
        articleId: this.$route.params.id,
        cover: this.articleContent.cover,
        active: 'ACTIVE',
      };
      this.uploadCover(this.coverImg).then((res: any) => {
        if ( res !== 'NO_IMG' ) {
          this.articleContent.cover = res.Location;
          body.cover = res.Location;
        }
        this.saveArticlePromise(this.ajaxMethod, body).then((res) => {
          this.ajaxMethod = 'PUT';
          this.$Message.success('发布成功');
        });
      });
    }
  }


  saveArticlePromise(ajaxMethod: string, content: object) {
    return new Promise((resolve, reject) => {
      if ( ajaxMethod === 'PUT' ) {
        $api.editorService.updateArticle(content).then((res: any) => {
          resolve(res);
        });
      } else if ( ajaxMethod === 'POST' ) {
        $api.editorService.saveArticle(content).then((res: any) => {
          resolve(res);
        });
      }
    });
  }

  preview() {
    if (this.ajaxMethod === 'POST') {
      this.$Message.error({
        content: '请先保存后预览',
        duration: 2.5
      });
    } else {
      this.isOk = true;
      this.$router.push(`/pageview/${this.$route.params.id}`);
    }
  }

  created() {
    this.ajaxMethod = 'POST';
    $api.editorService.article({
      id: this.$route.params.id
    }).then(res => {
      if ( res ) {
        this.articleContent = res;
        this.coverImgUrl = `${window.location.protocol}//${res.cover}`;
        this.ajaxMethod = 'PUT';
      }
    });
  }
}
</script>

<style lang='less'>
.back-modal {
  .ivu-modal-body{
    padding: 0 40px;
    .back-modal-content{
      display: flex;
      align-items: center;
      height: 102px;
      p {
        margin-left: 20px;
      }
      i {
        color: #f90;
        font-size: 28px;
      }
    }
  }
}
.edit-warp{
  .content-body{
    &.no-pagination{
      height: calc(100% - 48px);
      display: flex;
      justify-content: space-between;
      .ivu-form-item-label::after{
        content: "*";
        display: inline-block;
        margin-left: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 14px;
        color: #ed4014;
      }
      .art-title{
        width: 30%;
        .upload-form{
          padding-top: 12px;
        }
        .cover-preview{
          width: 200px;
          height: 200px;
          border-radius:2px;
          margin-top: 12px;
          position: relative;
          overflow: hidden;
          .cover-preview-mask{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
            text-align: center;
            line-height: 200px;
            i{
              font-size: 34px;
              cursor: pointer;
              color: #fff;
            }
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .cover-preview:hover .cover-preview-mask{
          display: block;
        }
        .ivu-upload{
          width: 200px;
          height: 200px;
          border-radius:2px;
          overflow: hidden;
          .upload-box{
            width: 100%;
            height: 100%;
            line-height: 220px;
          }
        }
      }
      .art-content{
        width: 68%;
        .edui-editor{
          z-index: 1 !important;
        }
        .ivu-form-item{
          margin-bottom: 0;
        }
      }
      .ueditor-wrap{
        height: 100%;
      }
    }
  }
}
</style>
