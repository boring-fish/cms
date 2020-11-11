<template>
    <div class="content-body no-pagination">
      <div class="total-num">
        <div>共{{pageInfo.totalNum}}条{{pageInfo.pageName}}素材</div>
        <div>
            <Select v-model="seachInfo.status" style="width:200px" v-if="!pageInfos.backStatus">
                <Option v-for="item in pageInfos.cityList" :value="item.value" :key="item.value" placeholder="请选择轻页面状态">{{ item.label }}</Option>
            </Select>
            <Input prefix="ios-search" v-model="seachInfo.title" :placeholder="'根据'+pageInfo.pageName+'标题搜索'" style="width: auto;margin:0 -5px 0 10px" />
        </div>
      </div>
      <div class="light-page">
        <div class="add-light-page" @click="addPage">
          <div class="add">
              <Icon type="md-add" size="30"/><br/>
              <span>新建{{pageInfo.pageName}}</span>
          </div>
          
          
        </div>
          <div class="add-light-page add-dark-page" v-for="(item,index) in pageInfos.addList" :key="index">
             <div class="add-item-top">
               <img :src="item.imgurl" alt="" v-if="item.imgurl">
               <p class="add-item-title">{{item.title}}</p>
             </div>
              <div class="add-item-middle">
                <p>{{item.detail}}</p>
                <p>{{item.updateTime}} <span class="mapped">已映射</span></p>
             </div>
             <Divider />
              <div class="add-item-bottom">
                <div class="add-item-bottom-status"  :class="item.realseStatus==='暂停中'?'add-item-bottom-status-red':item.realseStatus==='草稿箱'?'add-item-bottom-status-gray':''">
                     <span>{{item.realseStatus}}</span>
                </div>
               <div class="add-item-bottom-icon">
                  <Tooltip :content="items.text" v-for="(items,indexs) in item.tooltipList" :key="indexs"  >
                     <Icon :type="items.icon" @click="iconEvent(items.text,item)" v-if="items.status" />
                  </Tooltip>
                
                  <!-- <Tooltip :content="items.text"  v-for="(items,indexs) in item.tooltipList" :key="indexs" v-if="items.status">
                     <Icon :type="items.icon" @click="iconEvent(items.text,item)" />
                  </Tooltip> -->
                   <Poptip trigger="click" placement='bottom-end'>
                         <span style="cursor:pointer">...</span>
                         <div class="api" slot="content">
                           <div v-for="(itemNew,indexNew) in item.tooltipNewList" :key="indexNew">
                               <Tooltip :content="itemNew.text"  v-if="itemNew.status">
                                  <Icon :type="itemNew.icon"  @click="iconEvent(itemNew.text,item)" />
                              </Tooltip>
                           </div>
                             <!-- <Tooltip :content="itemNew.text" v-for="(itemNew,indexNew) in item.tooltipNewList" :key="indexNew" v-if="itemNew.status">
                                  <Icon :type="itemNew.icon"  @click="iconEvent(itemNew.text,item)" />
                              </Tooltip> -->
                        </div>
                  </Poptip>
                
               </div>
              
             </div>
          </div>
          <div  class="add-light-page-empty"></div>
          <div  class="add-light-page-empty"></div>
          <div  class="add-light-page-empty"></div>

      </div>
       <!-- 预览表单地址 -->
      <!-- <PageQrcode :previews='preview'></PageQrcode> -->
      <page-qrcode :previews='preview'></page-qrcode>
      <page-field :fields='field'></page-field>
      <Page :total="total" :current="current" size="small" show-total show-elevator @on-change="getPageData"  />
       
    </div>
</template>

<script lang="ts">
// import { Component, Vue, Prop } from 'vue-property-decorator';
import { Component, Vue, Prop } from 'vue-property-decorator';

import PageQrcode from './page-qrcode.vue';
import PageField from './page-field.vue';

@Component({
  components: {
   PageQrcode,
   PageField
  },
})

export default class PageAddItem extends Vue {
  total = 20;
  current = 1;
  realseText = '草稿箱';
  pageInfos = {};
  realseStatus = true;
  norealseStatus = false;
  stopRealseStatus = false;
  tooltipList: any = [];
  tooltipNewList: any = [];
  preview: any = {
  previewStatus: false,
  previewLink: '菜不辣鸡.表单列表',
  title: '表单地址二维码'
  };
  field: any = {
      fieldStatus: false,
      // previewLink: '菜不辣鸡.表单列表',
      title: '字段映射'

  };
 @Prop({
    required: false,
    default: ''
  }) pageInfo!: any;
  seachInfo = {};
  getPageData(newval: any) {
    console.log(newval);
    newval.addList.forEach((item: any, index: any) => {
         if (item.realseStatus === '已发布') {
           this.realseStatus = false;
           this.norealseStatus = true;
           this.stopRealseStatus = false;
           
         } else if (item.realseStatus === '草稿箱') {
           this.realseStatus = false;
           this.norealseStatus = true;
           this.stopRealseStatus = false;
         } else {
           this.realseStatus = false;
           this.norealseStatus = false;
           this.stopRealseStatus = true;
         }
          item.tooltipList = this.tooltipList;
     
    });
    console.log(newval.addList);
  }
  addPage() {
     this.$router.push(`/EditForm`);
  }
  iconEvent(name: any, data: any) {
    console.log(name, data);
   if (name === '地址二维码') {
       this.preview.previewStatus = true;
       this.preview =  JSON.parse(JSON.stringify(this.preview));
       console.log(this.preview);
   }
    if (name === '字段映射') {
       this.field.fieldStatus = true;
       this.field =  JSON.parse(JSON.stringify(this.field));
       console.log(this.field);
   }
    if (name === '编辑') {
      // this.$router.push('./edit-form')
      this.$router.push({
            name: 'EditForm',
            params: {
              formData: data  //TODO
            }
          });
    }
   if (name === '删除') {
       this.$Modal.confirm({
        title: '确定删除该表单吗？',
        content: '',
        onOk: () => {
           
        },
      });
   }
   if (name === '暂停发布') {
       this.$Modal.confirm({
        title: '确定对该表单进行暂停发布吗？',
        content: '表单暂停后，表单将停止收集信息，确定对该表单暂停发布吗？',
        onOk: () => {
           
        },
      });
   }
  }
  mounted() {
      this.pageInfo.addList.forEach((item: any, index: any) => {
         if (item.realseStatus === '已发布') {
           this.realseStatus = false;
           this.norealseStatus = false;
           this.stopRealseStatus = true;
         } else if (item.realseStatus === '草稿箱') {
           this.realseStatus = true;
           this.norealseStatus = false;
           this.stopRealseStatus = false;
         } else {
           this.realseStatus = true;
           this.norealseStatus = false;
           this.stopRealseStatus = true;
         }
          this.updataState();
          item.tooltipList = this.tooltipList;
          item.tooltipNewList = this.tooltipNewList;
       
     
    });
    this.pageInfos = this.pageInfo;
  }
  updataState() {
   this.tooltipList = [
    {
      text: '编辑',
      icon: 'icon-font nz-edit-square',
      status: true
    },
     {
      text: '发布',
      icon: 'icon-font nz-paperplane',
      status: this.realseStatus
    },
     {
      text: '暂停发布',
      icon: 'icon-font nz-stop-circle',
      status: !this.realseStatus
    },
  ];
  this.tooltipNewList = [
    {
      text: '字段映射',
      icon: 'icon-font nz-code',
      status: true
    },
     {
      text: '地址二维码',
      icon: 'icon-font nz-qrcode',
      status: this.stopRealseStatus
    },
     {
      text: '导出',
      icon: 'icon-font nz-export',
      status: this.stopRealseStatus
    },
      {
      text: '删除',
      icon: 'icon-font nz-delete',
      status: this.realseStatus
    },
  ];
  }
  created() {}
}
</script>

<style lang="less">
.light-manage-center-warp {
  .content-body {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #395069;
    line-height: 20px;
    &.no-pagination {
      height: calc(100% - 48px);
         .ivu-tooltip-popper[x-placement="bottom"]{
              .ivu-tooltip-arrow {
              margin-left: -2px!important;
              }
          } 
        .ivu-poptip-popper[x-placement="bottom-end"] .ivu-poptip-arrow {
            right: 0px;
        }
        .ivu-poptip-body {
              padding: 7px 2px;
          }
      .ivu-form-item-label {
        font-weight: 500;
        color: #0a2a4c;
      }
      .ivu-icon {
        vertical-align: bottom;
        cursor: pointer;
      }
      .ivu-form-item-label::after {
        content: '*';
        display: inline-block;
        margin-left: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 14px;
        color: #ed4014;
      }
      .total-num{
        width:100%;
        display: flex;
        justify-content: space-between;
      }
      .light-page{
        width:100%;
        height:570px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
         &::after{
            content: "";
            flex: 22%;
          }
       
        .add-light-page-empty{
          background: none !important;
           width:330px;
          height:260px;
          box-shadow: none;
          border-radius: 4px;
          margin-top:20px;
        }
         .add-dark-page{
            display: block !important;
            padding:16px 0;
            .ivu-divider-horizontal {
              margin: 16px 0;
   
              }
         }
         .add-light-page:hover{
            box-shadow: 0px 4px 18px -8px rgba(0, 0, 0, 0.2);
         }
      
        .add-light-page{
          width:330px;
          height:260px;
          background: #FFFFFF;
          box-shadow: 0px 2px 12px -4px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top:20px;
          .add{
            width: 100%;
            text-align: center;
          }
           .add-item-top{
             margin:0 0 0 16px;
             display: flex;
                img{
                    width: 72px;
                    height: 72px;
                  }
                .add-item-title{       
                  width: 100%;
                  height: 72px;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #0A2A4C;
                  line-height: 24px;
                  margin-left: 12px;
                }
            }
           .add-item-middle{
            font-size: 13px;
            color: #8494A6;
            line-height: 20px;
            margin:10px 0 0 16px;
             p:nth-child(1){
               width: 298px;
               height: 60px;  
               text-overflow: ellipsis;
               display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              overflow: hidden;
              }
              p:nth-child(2){
                margin-top:15px;
                .mapped{
                  width: 45px;
                  height: 21px;
                  line-height: 20px;
                  text-indent: 2px;
                  background: #FFFFFF;
                  border-radius: 9px;
                  border: 1px solid #FF9900;
                  color: #FF9900;
                  display: inline-block;
                  margin-left: 44%;
                  vertical-align: middle;
                }
              }
           }
           .add-item-bottom{
             padding:0 20px;
             display: flex;
             justify-content: space-between;
            .add-item-bottom-status{
               width: 55px;
                height: 24px;
                background: #00B2A6;
                border-radius: 4px;
                font-size: 13px;
                color: #FFFFFF;
                line-height: 23px;
                text-align: center;

             }
             .add-item-bottom-status-red{
                 background:#ED4014;
             }
             .add-item-bottom-status-gray{
                 background:#C6C9CF;
             }
              .add-item-bottom-icon{
                .ivu-poptip {
                    margin-left: 9px;
                  .ivu-poptip-popper {
                      min-width: 0%;
                      // width: 15%;
                      // left: 90% !important;
                    }
                  
                   .api{
                     display: flex;
                    justify-content: space-between;
                    /* margin-left: 11px; */
                    // width: 110px;
                    .ivu-tooltip {
                        // display: inline-block;
                        width: 34px;
                        text-align: center;
                    }
                  
                     .ivu-icon {
                      margin-left: 0px;
                  }
                   
                   }
                }
                .ivu-icon {
                      margin-left: 10px;
                  }
                 .ivu-icon:hover {
                     color:#00B2A6
                  }
              }
           }
        }
      }
      .ivu-page{
        float:right;
        margin-top:10px;
        .ivu-page-total {
           vertical-align: middle;
        }

      }
    }
  }
}
</style>
