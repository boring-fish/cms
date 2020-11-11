<template>
  <!-- <div class="edit-form-warp content-container"> -->
    <div class="content-header">
      <div class="left-panel">
        <div class="panel-item" v-if="pageInfo.backStatus">
          <Button type="primary" icon="ios-arrow-back" @click="back">返回</Button>
        </div>
        <div class="panel-item">
          <span>{{ pageInfo.pageName }}管理中心</span>
        </div>
      </div>
      <div class="right-panel">
        <div class="panel-item">
          <Button type="primary" icon="ios-paper-plane-outline"  v-if="pageInfo.backStatus">发布</Button>
           <Button  icon="md-help-circle" v-else>帮助</Button>
        </div>
      </div>
    </div>
   
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import axios from 'axios';
@Component({
  components: {
   
  },
})
export default class PageHeader extends Vue {
  // pageTitle = '轻页面管理中心1';
  @Prop({
    required: false,
    default: ''
  }) pageInfo!: any;
  //  @Prop({
  //   required: false,  
  //   default: true
  // }) backStatus!: Boolean;
  back() {
    this.$router.push('/list');
  }
 
  created() {}
}
</script>

<style lang="less">
// .edit-form-warp {
//   .content-body {
//     font-family: PingFangSC-Regular, PingFang SC;
//     &.no-pagination {
//       height: calc(100% - 48px);
//       display: flex;
//       justify-content: space-around;
//       .ivu-form-item-label {
//         font-size: 14px;
//         font-family: PingFangSC-Regular, PingFang SC;
//         font-weight: 500;
//         color: #0a2a4c;
//         line-height: 20px;
//       }
//       .ivu-icon {
//         vertical-align: bottom;
//       }
//         .ivu-input {
//         font-size: 14px;
//         font-family: PingFangSC-Regular, PingFang SC;
//         font-weight: 400;
//         color: #395069;
//         line-height: 20px;
//       }
//       .norequire {
//         .ivu-form-item-label::after {
//           content: '';
//           display: inline-block;
//         }
//       }
//       // .art-left-content {
//       //   width: 272px;
//       //   height: 438px;
//       //   background: #ffffff;
//       //   box-shadow: 0px 2px 12px -4px rgba(0, 0, 0, 0.1);
//       //   border-radius: 4px;
//       //   padding: 16px;
//       //   .menuitem {
//       //     width: 100%;
//       //     display: flex;
//       //     flex-wrap: wrap;
//       //     border-radius: 4px 0px 0px 0px;
//       //     border: 1px solid #d4dbe1;
//       //   }
//       //   .menulist {
//       //     width: 50%;
//       //     height: 60px;
//       //     background: #ffffff;
//       //     border-bottom: 1px solid #d4dbe1;
//       //     border-right: 1px solid #d4dbe1;
//       //     color: #395069;
//       //     line-height: 20px;
//       //     text-align: center;
//       //     padding-top: 10px;
//       //     &:nth-child(2n) {
//       //       border-left: none;
//       //       border-right: none;
//       //     }
//       //     &:nth-child(5) {
//       //       border-bottom: none;
//       //     }
//       //     &:nth-child(6) {
//       //       border-bottom: none;
//       //     }
//       //   }
//       // }
//       ::-webkit-scrollbar {
//         width: 0 !important;
//       }
//       ::-webkit-scrollbar {
//         width: 0 !important;
//         height: 0;
//       }
//       // .art-middle-content {
//       //   width: 680px;
//       //   height: 722px;
//       //   margin-left: 78px;
//       //   background: #ffffff;
//       //   border-radius: 4px;
//       //   border: 1px solid #e5e5e5;
//       //   position: relative;
//       //   overflow: scroll;
//       //   overflow-x: hidden;
//       //   .ivu-form-item-label {
//       //     font-size: 14px;
//       //     font-family: PingFangSC-Semibold, PingFang SC;
//       //     color: #0a2a4c;
//       //     line-height: 20px;
//       //     font-weight: 600;
//       //   }

//       //   .init-message {
//       //     width: 234px;
//       //     height: 50px;
//       //     font-size: 18px;
//       //     font-weight: 400;
//       //     color: #c6c9cf;
//       //     line-height: 25px;
//       //     text-align: center;
//       //     margin: 25% 0 0 28%;
//       //   }
//       //   .add-content {
//       //     padding: 50px;
//       //     .add-form-infor {
//       //       width: 100%;
//       //       font-size: 14px;
//       //       font-weight: 400;
//       //       color: #395069;
//       //       padding-left: 10px;

//       //       h6 {
//       //         font-size: 18px;
//       //         font-weight: 600;
//       //         color: #0a2a4c;
//       //         line-height: 25px;
//       //         text-align: center;
//       //       }
//       //       p {
//       //         width: 100%;
//       //         text-indent: 30px;
//       //         margin-top: 15px;
//       //       }
//       //     }
//       //     .control-tools:hover {
//       //       background: #f5faff;
//       //       border: 1px dashed #d4dbe1;
//       //       .ivu-icon-ios-trash {
//       //         position: absolute;
//       //         color: #ed4014;
//       //         right: 20px;
//       //         top: 20px;
//       //         display: block;
//       //       }
//       //     }
//       //     .control-tools {
//       //       width: 100%;
//       //       padding: 10px;
//       //       margin-top: 20px;
//       //       position: relative;
          
//       //       .ivu-form-item {
//       //         margin-bottom: 0px;
//       //       }
//       //       .ivu-icon-ios-trash {
//       //         display: none;
//       //       }
           
//       //     }
//       //     .uploadcol{
//       //         .ivu-form.ivu-form-label-top .ivu-form-item-content {
//       //         line-height: 0;
//       //         // justify-content: space-between;
//       //         display: flex;
//       //       }
//       //     }
         
//       //   }
//       //     .subbtn{

//       //         display:flex;
//       //         justify-content: center;
//       //         margin-top:20px;
//       //         button{
//       //         width: 200px;
//       //         height: 32px;
//       //         background: #00B2A6;
//       //         border-radius: 4px;
//       //         }
//       //       }
//       // }
//       // .art-right-content {
//       //   width: 272px;
//       //   height: 742px;
//       //   margin: -20px 0 0 78px;
//       //   .ivu-drawer-inner {
//       //     // width:272px !important;
//       //     // height:742px !important;
//       //     width: 20.5% !important;
//       //     height: 91% !important;
//       //     background: #ffffff;
//       //     box-shadow: -2px 0px 12px -4px rgba(0, 0, 0, 0.1);
//       //   }
//       //   .ivu-drawer-wrap-inner {
//       //     height: 816px;
//       //   }
//       // }
//     }
//   }
// }
</style>
