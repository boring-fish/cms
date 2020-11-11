<template>
      <!-- 预览表单地址 -->
     <div class="preview">
        <Modal v-model="preview.previewStatus" width="360" :transfer="false" >
        <p slot="header" >
            <span style="margin-left:10px">{{preview.title}}</span>
            <i v-if='preview.title==="预览表单地址"'>（预览连接不会收取任何数据）</i>
        </p>
         <p>表单地址：</p>
        <div class="previewLink"  ref="copy" data-clipboard-action="copy" :data-clipboard-text="preview.previewLink" @click="copy" >
           <span>{{preview.previewLink}}</span> 
          <Icon type="md-copy" size="18" style="margin:6px 2px 0px 0"></Icon>
       </div>
       <div class="formCode">
         <p>表单二维码：</p>
         <div id="qrcode" class="qrcode"></div>
       </div>
    </Modal>
  </div>
   
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({
  components: {
  },
})
export default class PageQrcode extends Vue {
  private QRCode: any;
  preview: any = {
  previewStatus: false,
  previewLink: ''

  };
  @Prop({
    required: false,
    default: {}
  }) previews!: any;
   @Watch('previews')
  previewsChange(newval: any, oldval: any) {
    console.log(newval);
   this.preview = newval;
    this.getQrcode();
  }
  mounted() {
    // this.initData = this.updateData;
  }
 
     
  
   //复制到剪贴板
    copy () {
      let copyBtn = new (this as any).clipboard(this.$refs.copy);
      let _this = this;
      let clipboard = copyBtn;
      clipboard.on('success', function () {
         _this.$Message.info('已复制');
      });
      clipboard.on('error', function () {
         _this.$Message.info('该浏览器不支持自动复制');
      });
    }
    //生成二维码
     getQrcode () {
       let codeHtml: any = document.getElementById('qrcode');
           codeHtml.innerHTML = ''; //清除二维码 
        let qrcode = new this.QRCode(document.getElementById('qrcode'), {
          text: this.preview.previewLink,
          width: 124,
          height: 124,
          correctLevel: this.QRCode.CorrectLevel.H // 二维码容错级别 H M L
        });
    }
   
  created() {}
}
</script>

<style lang="less">
   .preview{
        .ivu-modal {
            width: 600px !important;
         }
          .ivu-modal-header {
             padding: 14px 0px;
            i{
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #8494A6;
              line-height: 17px;
            }
       }
       .previewLink{
        width: 560px;
        height: 32px;
        background: #F8F8F8;
        border-radius: 4px;
        border: 1px solid #D4DBE1;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8494A6;
        line-height: 32px;
        padding-left:5px;
        margin-top:10px;
        .ivu-icon {
          float: right;
          margin-top: 5px;
        }
       }
       .formCode{
         margin-top:20px;
       }
       .qrcode {
        margin: 10px;
        display: flex;
        justify-content: center;
        -webkit-touch-callout: default;
        img{
          -webkit-touch-callout: default;
        }
      }
      }
</style>
