<template>
  <div class="light-manage-center-warp content-container">
   <page-header :pageInfo="pageInfo"></page-header>
   <page-add-item :pageInfo="pageInfo"></page-add-item>
    <!-- <div class="content-body no-pagination">
      <div class="total-num">
        <div>共{{totalNum}}条轻页面素材</div>
        <div>
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value" placeholder="请选择轻页面状态">{{ item.label }}</Option>
            </Select>
            <Input prefix="ios-search" placeholder="根据图文标题搜索" style="width: auto;margin:0 -5px 0 10px" />
        </div>
      </div>
      <div class="light-page">
      <page-add-item :pageName="pageName"></page-add-item>
      </div>
      
    </div> -->
    
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
export default class LightManageCenter extends Vue {
 
  pageInfo = {
     pageName : '轻页面',
     backStatus: false,
     addList: [
       {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02'

       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02'
         
       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02'
         
       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02'
         
       },
        {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02'
         
       },
         {
         imgurl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236588971,2140616544&fm=26&gp=0.jpg',
         title: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         detail: 'link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值link听数字观|上汽乘用车倪学磊：数字化必须与业务融合，服务于价值',
         updateTime: '2020-08-17 17:02'
         
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
