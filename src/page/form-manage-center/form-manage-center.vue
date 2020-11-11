<template>
  <div class="light-manage-center-warp content-container">
   <page-header :pageInfo="pageInfo"></page-header>
   <page-add-item :pageInfo="pageInfo"></page-add-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  PageHeader,
  PageAddItem
} from '@/components';

import axios from 'axios';
@Component({
  components: {
    PageHeader,
    PageAddItem
  },
})
export default class FormManageCenter extends Vue {
 
  pageInfo = {
     pageName : '表单',
     backStatus: false,
     addList: [
       {
        //  imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02',
         realseStatus: '已发布'
       },
        {
        //  imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02',
         realseStatus: '草稿箱'
         
       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02',
         realseStatus: '暂停中'

         
       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02',
         realseStatus: '暂停中'
       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02',
         realseStatus: '暂停中'
         
       },
         {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02',
         realseStatus: '暂停中'
         
       },
      //   {
      //    imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
      //    title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
      //    detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
      //    updateTime: '2020-08-17 17:02'
         
      //  },
      //   {
      //    imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
      //    title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
      //    detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
      //    updateTime: '2020-08-17 17:02'
         
      //  },
       
     ]
     
  };
  // pageName = '轻页面';
  totalNum = 0;
  cityList = [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    
                ];
                model1 = '';
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
    }
  }
}
</style>
