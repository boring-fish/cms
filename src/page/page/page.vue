<template>
  <div class="page" >
    <div 
      v-html="uiModel"
      :class="isMobileClass ? 'page-content-100' : 'page-content'"
    >

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getLocal, loadResources } from '@/utils/utils';

@Component({
  components: {

  }
})



export default class Page extends Vue {
  uiModel: string = '';
  isMobileClass: boolean = true;
  created() {
    this.isMobileClass = this.isMobile();
    $api.editorService.article({
      id: this.$route.params.id
    }).then(res => {
      if ( res ) { 
        this.uiModel = res.ui_model;
      }
    });
    console.log(this.isMobile());
  }


  isMobile() {
    let userAgentInfo = navigator.userAgent;
    let mobileAgents = [ 'Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad' ];
    let mobile_flag = false;

    //根据userAgent判断是否是手机
    for (let v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }

    let screen_width = window.screen.width;
    let screen_height = window.screen.height;   

    //根据屏幕分辨率判断是否是手机
    if (screen_width < 500 && screen_height < 800) {
      mobile_flag = true;
    }

    return mobile_flag;
  }

}


</script>

<style lang="less">
.page{
  .page-content{
    width: 580px;
    margin: 0 auto;
    img{
      width: 100%;
    }
  }
  .page-content-100{
    width: 100%;
    margin: 0 auto;
    img{
      width: 100%;
    }
  }
}
</style>
