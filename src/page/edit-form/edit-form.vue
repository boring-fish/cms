<template>
  <div class="edit-form-warp content-container">
    <div class="content-header">
      <div class="left-panel">
        <div class="panel-item">
          <Button type="primary" icon="ios-arrow-back" @click="back"
            >返回</Button
          >
        </div>
        <div class="panel-item">
          <span>{{ pageTitle }}</span> 
          <!-- 发布成功后可出现 -->
          <span  style=" font-size: 13px;
          color: #00B2A6;
          line-height: 20px;
          margin-left:10px;">已发布</span>
        </div>
        
      </div>
      <div class="right-panel">
        <div class="panel-item">
          <Button type="primary" icon="ios-paper-plane-outline" @click="goEditor()">保存并发布</Button>
        </div>
         <div class="panel-item">
           <Button  icon="icon-font nz-save" >保存</Button>
        </div>
         <div class="panel-item">
           <Button icon="icon-font nz-eye"  @click="goPreview()">预览</Button> 
        </div>
      </div>
    </div>
    <div class="content-body no-pagination">
      <div class="art-left-content">
      
        <Form label-position="top" ref="articleContent" :model="articleContent">
             <Tabs type="card" >
        <TabPane label="基本信息" name="tab1" context-menu>
              <FormItem label="表单标题" prop="title" :rules=" [{ required: true}]">
            <Input
              v-model="articleContent.title"
              size="small"
              placeholder="请输入表单标题"
              @on-change="entercontent()"
            />
          </FormItem>
          <FormItem label="表单描述" prop="detail" class="norequire">
            <Input
              v-model="articleContent.detail"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入表单描述"
              @on-change="entercontent()"
            />
          </FormItem>
           <FormItem label="封面图" prop="cover" class="upload-form" :rules=" [{ required: true}]">
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
                <Icon style='opacity:0.9;color: #8494A6;' type="icon-font nz-cloud-upload" size="42"></Icon>
              </div>
            </Upload>
            <div class="cover-preview" v-show="coverImgUrl">
              <img :src="coverImgUrl" alt="">
              <div class="cover-preview-mask">
                <Icon type="ios-trash-outline" @click.native="delCover"></Icon>
              </div>
            </div>
            <p class="authorizations">建议图片比例1:1，不大于xxMB</p>
          </FormItem>
          <div class="emptydiv" v-if="articleContent.title">
                <div class="all-preview">
                  <div class="all-preview-name">
                      <p>封面预览</p>
                    </div>
                    <div class="all-preview-content">
                      <h6>{{articleContent.title}}</h6>
                      <div class="all-preview-detail">
                        <div>{{articleContent.detail}}</div>
                        <img :src="coverImgUrl" alt="" v-if="coverImgUrl">
                      </div>
                    </div>
                 </div>
               </div>
         

        </TabPane>
        <TabPane label="题目信息" name="tab2" context-menu>
            <FormItem label="题目控件" class="norequire">
            <div class="menuitem">
              <div
                class="menulist" :class="item.checked?'menulistChecked':''"
                v-for="(item, index) in menulist"
                :key="item+index"
                @click="openRight(item,index)"
              >
                <Icon :type="item.icon" size="14" />
                <div class="wordtitle">{{ item.name }}</div>
              </div>
            </div>
          </FormItem>
            <FormItem label="收集填写者微信信息" class="norequire">
             <div>
                <Button @click="noUserInfo" :class="userInfoStatus?'':'menulistChecked'">不收集用户信息</Button>
                <Button @click="userInfo" :class="userInfoStatus?'menulistChecked':''">收集用户信息</Button>
             </div>
          </FormItem>
            <FormItem label="获取填写信息" class="norequire" v-if="userInfoStatus">
                <RadioGroup v-model="wechat.info">
                    <Radio label="info">获取填写者微信个人信息<p class="authorization">(请授权确认)</p></Radio>
                    <Radio label="openid">静默获取填写者微信OpenID<p class="authorization">(无需确认)</p></Radio>
                </RadioGroup>
          </FormItem>
          <FormItem label="请选择微信公众号" class="norequire" v-if="userInfoStatus">
                <img src="../../assets/img/wechat-circle-fill.png" alt="">
                 <Select v-model="wechat.num" style="width:200px" class="wechatSelect">
                    <Option v-for="wechatitems in wechatList" :value="wechatitems.value" :key="wechatitems.value">{{ wechatitems.label }}</Option>
                </Select>
          </FormItem>
        </TabPane>
    </Tabs>
        
          
        </Form>
      </div>
      <div class="art-middle-content">
        <!-- 新建初始化 -->
        <div class="init-message" v-if="initDataStatus">
          <p>请从左侧填写基本信息</p>
          <p>并选择题目控件创建一份表单</p>
        </div>
        <div class="add-content" v-else>
          <div class="add-form-infor">
            <h6>{{articleContent.title}}</h6>
            <p>
              {{articleContent.detail}}
            </p>
          </div>
          <template v-if="initData.addRadioData">
          <div class="control-tools"  @click="editCol(radioItem)" v-for="(radioItem,radioIndex) in initData.addRadioData" :key="'radioItem'+radioIndex" >
            <radio-col :addRadioData="radioItem" @addRadioData="addRadioDataArr" :submitStatus='submitStatus'></radio-col>
            <Icon type="ios-trash" @click="delCol(radioItem)" />
          </div>
          </template>
          <!-- <div class="control-tools"  @click="editCol(radioItem)" v-for="(radioItem,radioIndex) in initData.addRadioData" :key="'radioItem'+radioIndex" v-if="initData.addRadioData">
            <radio-col :addRadioData="radioItem" @addRadioData="addRadioDataArr" :submitStatus='submitStatus'></radio-col>
            <Icon type="ios-trash" @click="delCol(radioItem)" />
          </div> -->
          <template v-if="initData.addCheckboxData">
            <div class="control-tools" @click="editCol(checkboxItem)" v-for="(checkboxItem,CheckboxIndex) in initData.addCheckboxData" :key="'checkboxItem'+CheckboxIndex" >
              <checkbox-col :addCheckboxData="checkboxItem"></checkbox-col>
              <Icon type="ios-trash" @click="delCol(checkboxItem)" />
            </div>
          </template>
          <template v-if="initData.addSingleData">
              <div class="control-tools" @click="editCol(singleItem)" v-for="(singleItem,singleIndex) in initData.addSingleData" :key="'singleItem'+singleIndex" >
                <single-line-text :addSingleData="singleItem"></single-line-text>
                <Icon type="ios-trash"  @click="delCol(singleItem)" />
              </div>
          </template>
          <template v-if="initData.addMultData">
            <div class="control-tools" @click="editCol(multItem)" v-for="(multItem,multIndex) in initData.addMultData" :key="'multItem'+multIndex" >
              <multiline-text :addMultData="multItem"></multiline-text>
              <Icon type="ios-trash"  @click="delCol(multItem)" />
            </div>
          </template>
          <template v-if="initData.addSelectData">
            <div class="control-tools" @click="editCol(selectItem)" v-for="(selectItem,selectIndex) in initData.addSelectData" :key="'selectItem'+selectIndex"  >
              <select-col :addSelectData="selectItem"></select-col>
              <Icon type="ios-trash"  @click="delCol(selectItem)" />
            </div>
          </template>
          <template v-if="initData.addUploadData">
            <div class="control-tools uploadcol" @click="editCol(uploadItem)" v-for="(uploadItem,uploadIndex) in initData.addUploadData" :key="'uploadItem'+uploadIndex"  >
              <upload-col :addUploadData="uploadItem"></upload-col>
              <Icon type="ios-trash"  @click="delCol(uploadItem)" />
            </div>
          </template>

           <!-- <div class="control-tools" @click="editCol(checkboxItem)" v-for="(checkboxItem,CheckboxIndex) in initData.addCheckboxData" :key="'checkboxItem'+CheckboxIndex" v-if="initData.addCheckboxData">
            <checkbox-col :addCheckboxData="checkboxItem"></checkbox-col>
            <Icon type="ios-trash" @click="delCol(checkboxItem)" />
          </div>
          <div class="control-tools" @click="editCol(singleItem)" v-for="(singleItem,singleIndex) in initData.addSingleData" :key="'singleItem'+singleIndex" v-if="initData.addSingleData">
            <single-line-text :addSingleData="singleItem"></single-line-text>
            <Icon type="ios-trash"  @click="delCol(singleItem)" />
          </div>
          <div class="control-tools" @click="editCol(multItem)" v-for="(multItem,multIndex) in initData.addMultData" :key="'multItem'+multIndex" v-if="initData.addMultData">
            <multiline-text :addMultData="multItem"></multiline-text>
            <Icon type="ios-trash"  @click="delCol(multItem)" />
          </div>
          <div class="control-tools" @click="editCol(selectItem)" v-for="(selectItem,selectIndex) in initData.addSelectData" :key="'selectItem'+selectIndex" v-if="initData.addSelectData" >
            <select-col :addSelectData="selectItem"></select-col>
            <Icon type="ios-trash"  @click="delCol(selectItem)" />
          </div>
          <div class="control-tools uploadcol" @click="editCol(uploadItem)" v-for="(uploadItem,uploadIndex) in initData.addUploadData" :key="'uploadItem'+uploadIndex" v-if="initData.addUploadData" >
            <upload-col :addUploadData="uploadItem"></upload-col>
            <Icon type="ios-trash"  @click="delCol(uploadItem)" />
          </div> -->
          <!-- <Row > -->
            <div span="24" class="subbtn" v-if="btnStatus">
              <Button type="success" html-type="button" size="large" @click="formSubmit">提交</Button>
            </div>
          <!-- </Row> -->
        </div>
      </div>
      <div class="art-right-content">
        <Drawer
          :title="rightTitle"
          :closable="false"
          v-model="rightConVisible"
          :mask="false"
          :transfer="false"
          :inner="true"
        >
          <setting-col  :lineStatus="lineStatus" :fileStatus="fileStatus" @setData="getSetData"></setting-col>
        </Drawer>
      </div>
      <!-- 保存并发布 -->
      <div class="release">
        <Modal v-model="releaseStatus" width="360" :transfer="false" >
        <p slot="header" >
            <Icon type="ios-alert-outline" style="color: #FF9900;"></Icon>
            <span style="margin-left:10px">确定保存并发布表单吗？</span>
        </p>
        <div>
            <p>表单发布后，如需修改需暂停回收后再进行编辑，是否确定发布？</p>
        </div>
    </Modal>
      </div>
      <!-- 预览表单地址 -->
      <page-qrcode :previews='preview'></page-qrcode>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { v4 as UUID } from 'uuid';

import {
  RadioCol,
  CheckboxCol,
  SingleLineText,
  MultilineText,
  SelectCol,
  UploadCol,
  SettingCol,
  PageQrcode
} from '@/components';

import axios from 'axios';
@Component({
  components: {
    RadioCol,
    CheckboxCol,
    SingleLineText,
    MultilineText,
    SelectCol,
    UploadCol,
    SettingCol,
    PageQrcode
  },
})
export default class EditForm extends Vue {
  private QRCode: any;
  copyContent = 'ewfea';
  pageTitle = '编辑表单';
  rightTitle = '编辑题目-';
  articleContent: object = {
    widget: {}
  };
  btnStatus: boolean = false;
  submitStatus: boolean = false;
  releaseStatus: boolean = false;
  userInfoStatus: boolean = false;
  deleteFormStatus: boolean = false;
  preview: any = {
  previewStatus: false,
  previewLink: '菜不辣鸡.许',
  title: '预览表单地址'

  };
  initData: any = {
    addRadioData: [],
    addCheckboxData: [],
    addSelectData: [],
    addSingleData: [],
    addMultData: [],
    addUploadData: [],
  };
  wechat: any = {};
  wechatList = [];
  menulist = [
    {
      icon: 'md-radio-button-on',
      name: '单选题',
      checked: false
    },
    {
      icon: 'md-checkbox-outline',
      name: '多选题',
      checked: false
    },
    {
      icon: 'icon-font nz-edit-fill',
      name: '单行文本题',
      checked: false
    },
    {
      icon: 'icon-font nz-file-text',
      name: '多行文本题',
      checked: false
    },
    {
      icon: 'icon-font nz-caret-down',
      name: '下拉选择题',
      checked: false
    },
    {
      icon: 'icon-font nz-cloud-upload',
      name: '附件上传',
      checked: false
    },
  ];
  rightConVisible = false;
  initDataStatus = true;
  lineStatus = {};
  fileStatus = {};
  updateData: any = {
    addRadioData: [],
    addCheckboxData: [],
    addSelectData: [],
    addSingleData: [],
    addMultData: [],
    addUploadData: [],
  };
  coverImg = '';
  coverImgUrl: any = '';
  count = 0;
  isOK: boolean = false; //保存后可跳转
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
  delCover() {
    this.coverImg = '';
    this.coverImgUrl = '';
  }
  back() {
    this.isOK = true; //TODO
    if (this.isOK) {
      this.$router.push('/list');
    } else {
         this.$Modal.confirm({
        title: '确定返回上一页吗？',
        content: '您还没保存编辑，是否确定返回到上一页？',
        onOk: () => {
           
        },
      });
    }
    
  }
  entercontent() {
     this.initDataStatus = false;
  }
  mounted() {
    console.log(this.$route.params);
    this.initData = this.updateData;
  }
  getSetData(data: any) {
    console.log(data);
    console.log(this.updateData);
        switch (data.type) {
            case '单选题': this.updateData.addRadioData = this.operateData(this.updateData.addRadioData, data) ; break;
            case '多选题':  this.updateData.addCheckboxData = this.operateData(this.updateData.addCheckboxData, data); break;
            case '下拉选择题': this.updateData.addSelectData = this.operateData(this.updateData.addSelectData, data); break;
            case '单行文本题': this.updateData.addSingleData = this.operateData(this.updateData.addSingleData, data); break;
            case '多行文本题': this.updateData.addMultData = this.operateData(this.updateData.addMultData, data); break;
            case '附件上传': this.updateData.addUploadData = this.operateData(this.updateData.addUploadData, data); break;

          }
      //  this.initData =  JSON.parse(JSON.stringify(this.updateData));
       this.initData = JSON.parse(JSON.stringify(this.updateData));

  }
  unique(arr: Array<any>) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
      }
  operateData(data: Array<object>, dataItem: any) {
    //data需要添加的数据,dataItem更改的数据
    console.log(data, dataItem);
     if (data.length !== 0) {
              data.forEach((item: any, index: any) => {
                console.log(item.id, dataItem.id);
                if ( item.id === dataItem.id) {
                  data[index] = dataItem;
                } else {
                  data.push(dataItem);
                  data = this.unique(data);

                }

              });
     } else {
       data.push(dataItem);
     }
       console.log(data);
     return data;
  

  }
  formSubmit() {
    this.submitStatus = true;
    console.log(this.articleContent);

  }
  addRadioDataArr(data: any) {
   console.log(data);
  }
  openRight(data: any, index: any) {
    console.log(data);
    this.count++;
    console.log(data, index);
   
    this.initDataStatus = false;
    this.btnStatus = true;
    this.menulist.forEach(item => {
      let list = [
                  {optionName: '选项一'},
                  {optionName: '选项二'}
              ];
      let listobj = {
                  name: item.name,
                  id: this.count,
                  type: item.name,
                };
      if ( item === data ) {
        item.checked = true;
       
        console.log(item.name);
        switch (item.name) {
          case '单选题':
          //  this.updateData.addRadioData ? this.updateData.addRadioData :
          // // this.updateData.addRadioData = [Object.assign(listobj, {list: list})] ; 
          this.updateData.addRadioData.push(Object.assign(listobj, {list: list})); 
           this.selectQues(data.name, Object.assign(listobj, {list: list}));
           break;
          case '多选题':
          //  this.updateData.addCheckboxData ? this.updateData.addCheckboxData :
          // this.updateData.addCheckboxData = [Object.assign(listobj, {list: list})] ; 
           this.updateData.addCheckboxData.push(Object.assign(listobj, {list: list})); 
           this.selectQues(data.name, Object.assign(listobj, {list: list}));
           break;
          case '下拉选择题': 
        //    this.updateData.addSelectData ? this.updateData.addSelectData :
        //  this.updateData.addSelectData = [Object.assign(listobj, {list: list})] ; 
         this.updateData.addSelectData.push(Object.assign(listobj, {list: list})); 
           this.selectQues(data.name, Object.assign(listobj, {list: list}));
           break;
             case '单行文本题': 
        //       this.updateData.addSingleData ? this.updateData.addSingleData :
        //  this.updateData.addSingleData = [Object.assign(listobj, {num: '20'})] ; 
          this.updateData.addSingleData.push(Object.assign(listobj, {list: list})); 
           this.selectQues(data.name, Object.assign(listobj, {num: 20, numData: true}));
           break;
             case '多行文本题': 
        //       this.updateData.addMultData ? this.updateData.addMultData :
        //  this.updateData.addMultData = [Object.assign(listobj, {num: '200'})] ; 
          this.updateData.addMultData.push(Object.assign(listobj, {list: list})); 
           this.selectQues(data.name, Object.assign(listobj, {num: 200, numData: true}));
           break;
             case '附件上传': 
        //       this.updateData.addUploadData ? this.updateData.addUploadData :
        //  this.updateData.addUploadData = [listobj] ; 
          this.updateData.addUploadData.push(Object.assign(listobj, {list: list})); 
           this.selectQues(data.name, listobj);
           break;
        }
        console.log(this.initData, '新增表单');
        // debugger
        this.initData = JSON.parse(JSON.stringify(this.updateData));
         console.log(this.initData, '新增表单2');
      
      } else {
        item.checked = false;
      }
    });
    this.rightConVisible = true;
    }
    //根据类型选择相应的问题类型
  selectQues(data: any, dataItem: any) {
     this.rightTitle = '编辑题目-';
      console.log(data, dataItem, this.count);
      if (data === '单行文本题' || data === '多行文本题') {
        
      this.lineStatus = {
        status: true,
        type: data,
        id:  dataItem.id,
        initData: dataItem
      } ;
    } else if (data === '附件上传') {
      this.fileStatus = {
        status: true,
        type: data,
        id: dataItem.id,
        initData: dataItem
      } ;
    } else {
       this.lineStatus = {
        status: false,
        type: data,
        id: dataItem.id ,
        initData: dataItem
      } ;
    }
     this.rightTitle += data;
    }
    //编辑选项
  editCol(data: any) {
     console.log(data);
    this.selectQues(data.type, data);
    }
    //删除题目控件
  delCol(data: any) {
      console.log(this.initData);
      this.$Modal.confirm({
        title: '确定删除此题目控件？',
        onOk: () => {
           switch (data.type) {
              case '单选题': this.updateData.addRadioData = this.delOption(this.updateData.addRadioData, data); break;
              case '多选题': this.updateData.addCheckboxData = this.delOption(this.updateData.addCheckboxData, data); break;
              case '下拉选择题': this.updateData.addSelectData = this.delOption(this.updateData.addSelectData, data); break;
              case '单行文本题': this.updateData.addSingleData = this.delOption(this.updateData.addSingleData, data); break;
              case '多行文本题': this.updateData.addMultData = this.delOption(this.updateData.addMultData, data); break;
              case '附件上传': this.updateData.addUploadData = this.delOption(this.updateData.addUploadData, data); break;
          }
        console.log(this.updateData);

         this.initData = this.updateData;

        console.log(this.initData);
        },
      });
      //  this.initData = JSON.parse(JSON.stringify(this.updateData));
       this.initData = this.updateData;

        console.log(this.initData);
    }
    delOption(data: Array<any>, dataItem: any) {
      data.forEach((item: any, index: any) => {
        if (dataItem.id === item.id) {
                data.splice(index, 1);
              }
      });
        return data;
     }
    goPreview() {
       this.preview.previewStatus = true;
       this.preview =  JSON.parse(JSON.stringify(this.preview));
    }
    goEditor(uuid?: string) {
      this.releaseStatus = true;
    // if ( uuid ) {
    //   // this.$router.push(`/edit/${uuid}`);
    //   this.$router.push(`/EditForm/${uuid}`);
    // } else {
    //   // this.$router.push(`/edit/${UUID()}`);
    //   this.$router.push(`/FormManageCenter/${UUID()}`);

    // }
  }
    userInfo() {
      this.userInfoStatus = true;
    }
    noUserInfo() {
      this.userInfoStatus = false;
    }
  created() {}
}
</script>

<style lang="less">
.edit-form-warp {
  .content-body {
    font-family: PingFangSC-Regular, PingFang SC;
    &.no-pagination {
      height: calc(100% - 48px);
      display: flex;
      justify-content: space-around;
      .ivu-form-item-label {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 500;
        color: #0a2a4c;
        line-height: 20px;
      }
      .ivu-icon {
        vertical-align: bottom;
      }
        .ivu-input {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #395069;
        line-height: 20px;
      }
      .norequire {
        .ivu-form-item-label::after {
          content: '';
          display: inline-block;
        }
      }
      .art-left-content {
        width: 272px;
        height: 438px;
        background:#F2F4F7;
         box-shadow: none;
        border-radius:0;
         padding: 0;
        .ivu-form {
        background: #F2F4F7;
        background: #FDFDFA;
        .emptydiv{
         width: 114%;
        margin-left: -16px;
        height: 39%;
        box-shadow: 4px 2px 4px -7px rgba(0, 0, 0, 0.2);
        /* border-radius: 4px 4px 0px 0px; */
        background: #ebeef2;
        }
        .all-preview{
          margin-top:10px;
          padding-top:20px;
           background: #ebeef2;
           height: 296px;
          .all-preview-name{
            background: #ebeef2;
            height: 32px;
            p{
              width: 70px;
              height: 32px;
              background: #FFFFFF;
              text-align: center;
              line-height: 32px;
            }
          }
          .all-preview-content{
              background: #FFFFFF;
              padding:14px;
              
              h6{
                font-size: 16px;
                font-weight: 400;
                color: #323233;
                line-height: 22px;
                text-align: center;
              }
              .all-preview-detail{
                font-size: 13px;
                font-weight: 400;
                color: #969799;
                line-height: 18px;
                display: flex;
                margin-top:10px;
                div{
                   width: 178px;
                  height: 54px;  
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                }
                img{
                  width: 50px;
                  height: 50px;
                  border-radius: 1px;
                  margin-left:16px;
                  background:#969799;
                }
              }
          }
        }
        .authorizations{
           margin-top: 16px;
          font-size: 12px;
          font-weight: 400;
          color: #8494A6;
        }
         .cover-preview{
          width: 100px;
          height: 100px;
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
              font-size: 22px;
              cursor: pointer;
              color: #fff;
              vertical-align: super;
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
          width: 100px;
          height: 100px;
          border-radius:2px;
          overflow: hidden;
          .upload-box{
            width: 100px;
            height: 98px;
            line-height: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        
        .ivu-tabs {
            box-shadow: 0px 2px 12px -4px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            .ivu-tabs-nav-scroll {
                background: #eff0f2 !important;
            }
            .ivu-tabs-bar {
              background: #F2F4F7;
              border:none;
              .ivu-tabs-tab{
                border:none !important;
              }
              .ivu-tabs-nav-container {
                height: 32px;
                background: #F2F4F7;
}
            }
            .ivu-tabs-tabpane{
                padding: 16px 16px 0 16px;
            }
          .ivu-tabs-nav-wrap {
                .ivu-tabs-tab{
                  background: #F2F4F7;
                  border:none;
                  color: #8494A6;
                }
                .ivu-tabs-tab-active{
                  background: #FFFFFF;
                  color: #0A2A4C;
                  font-weight: 500;

                }
            }
       }
       
        }
        .authorization{
          margin: -16px 0 0 16px;
          font-size: 12px;
          font-weight: 400;
          color: #8494A6;
        }
        .wechatSelect{
          margin-left:20px;
          width: 183px !important;
        }
        .menuitem {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          border-radius: 4px 0px 0px 0px;
          border: 0.5px solid #d4dbe1;
        }
         .menulist:hover{
            border: 1px solid #00B2A6 !important;
            color:  #00B2A6;
         }
         .menulistChecked{
            border: 1px solid #00B2A6 !important;
            color:  #00B2A6 !important;
         }
        .menulist {
          width: 50%;
          height: 60px;
          background: #ffffff;
          // border-radius: 4px 0px 0px 0px;
          border-bottom: 1px solid #d4dbe1;
          border-right: 1px solid #d4dbe1;
          color: #395069;
          line-height: 20px;
          text-align: center;
          padding-top: 10px;
          // .wordtitle{
          //   // margin-top: -12px;

          // }
          &:nth-child(2n) {
            border-left: none;
            border-right: none;
          }
          &:nth-child(5) {
            border-bottom: none;
          }
          &:nth-child(6) {
            border-bottom: none;
          }
        }
      }
      ::-webkit-scrollbar {
        width: 0 !important;
      }
      ::-webkit-scrollbar {
        width: 0 !important;
        height: 0;
      }
      .art-middle-content {
        width: 680px;
        height: 722px;
        margin-left: 78px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
        position: relative;
        overflow: scroll;
        overflow-x: hidden;
        .ivu-form-item-label {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          color: #0a2a4c;
          line-height: 20px;
          font-weight: 600;
        }

        .init-message {
          width: 234px;
          height: 50px;
          font-size: 18px;
          font-weight: 400;
          color: #c6c9cf;
          line-height: 25px;
          text-align: center;
          margin: 25% 0 0 28%;
        }
        .add-content {
          padding: 50px;
          // line-height: 21px;
          .add-form-infor {
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            color: #395069;
            padding-left: 10px;

            h6 {
              font-size: 18px;
              font-weight: 600;
              color: #0a2a4c;
              line-height: 25px;
              text-align: center;
            }
            p {
              width: 100%;
              text-indent: 30px;
              margin-top: 15px;
            }
          }
          .control-tools:hover {
            background: #f5faff;
            border: 1px dashed #d4dbe1;
            .ivu-icon-ios-trash {
              position: absolute;
              color: #ed4014;
              right: 20px;
              top: 20px;
              display: block;
            }
          }
          .control-tools {
            width: 100%;
            // height: 112px;
            padding: 10px;
            margin-top: 20px;
            position: relative;
          
            .ivu-form-item {
              margin-bottom: 0px;
            }
            .ivu-icon-ios-trash {
              display: none;
            }
           
          }
          .uploadcol{
              .ivu-form.ivu-form-label-top .ivu-form-item-content {
              line-height: 0;
              // justify-content: space-between;
              display: flex;
            }
          }
         
        }
          .subbtn{

              display:flex;
              justify-content: center;
              margin-top:20px;
              button{
              width: 200px;
              height: 32px;
              background: #00B2A6;
              border-radius: 4px;
              line-height: 17px;
              }
            }
      }
      .art-right-content {
        width: 272px;
        height: 742px;
        margin: -20px 0 0 78px;
        .ivu-drawer-inner {
          // width:272px !important;
          // height:742px !important;
          width: 20.5% !important;
          height: 91% !important;
          background: #ffffff;
          box-shadow: -2px 0px 12px -4px rgba(0, 0, 0, 0.1);
        }
        .ivu-drawer-wrap-inner {
          height: 816px;
        }
      }
      .release{
         .ivu-modal-header {
        border:none;
       }
      .ivu-modal-footer {
        border:none;
       }
      }
      // .preview{
      //   .ivu-modal {
      //       width: 600px !important;
      //    }
      //     .ivu-modal-header {
      //        padding: 14px 0px;
      //       i{
      //         font-size: 12px;
      //         font-family: PingFangSC-Regular, PingFang SC;
      //         font-weight: 400;
      //         color: #8494A6;
      //         line-height: 17px;
      //       }
      //  }
      //  .previewLink{
      //   width: 560px;
      //   height: 32px;
      //   background: #F8F8F8;
      //   border-radius: 4px;
      //   border: 1px solid #D4DBE1;
      //   font-size: 14px;
      //   font-family: PingFangSC-Regular, PingFang SC;
      //   font-weight: 400;
      //   color: #8494A6;
      //   line-height: 32px;
      //   padding-left:5px;
      //   .ivu-icon {
      //     float: right;
      //     margin-top: 5px;
      //   }
      //  }
      //  .formCode{
      //    margin-top:20px;
      //  }
      //  .qrcode {
      //   margin: 10px;
      //   display: flex;
      //   justify-content: center;
      //   -webkit-touch-callout: default;
      //   img{
      //     -webkit-touch-callout: default;
      //   }
      // }
      // }
    }
  }
}
</style>
