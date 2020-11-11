<template>
  <div class="nz-pagination">
    <Page class="page" :current="iCurrent" :total="total" :page-size="pageSize" show-total @on-change="change" show-elevator></Page>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {

  }
})


export default class NzPagination extends Vue {

  @Prop({ 
    default: 0 
  }) total!: number;

  @Prop({
    default: 50 
  }) pageSize!: number;
  

  @Prop({
    default: 0
  }) current!: number;

  change(pageNum: number) {
    this.$emit('goto-page', pageNum - 1);
    // this._dynStyle(pageNum);
  }

  get iCurrent() {
    return this.current + 1;
  }

  get pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }

  @Watch('total')
  private _totalChange(old: number, val: number) {
    // this._dynStyle(1);
  }

  // private _dynStyle(pageNum: number) {
  //   if (this.pageCount < 6) {
  //     document.querySelector('.nz-pagination .ivu-page-item[title="1"]')['style'].display =
  //       'inline-block';
  //     return;
  //   }
  //   if (pageNum > 3) {
  //     document.querySelector('.nz-pagination .ivu-page-item[title="1"]')['style'].display =
  //       'none';
  //   } else {
  //     document.querySelector('.nz-pagination .ivu-page-item[title="1"]')['style'].display =
  //       'inline-block';
  //   }
  // }
}
</script>

<style lang="less">
.nz-pagination {
  width: 100%;
  height: 100%;
  text-align: center;
  .page {
    padding-top: 6px;
    display: inline-block;
    span {
      overflow: visible;
    }

    .ivu-page-item-jump-next {
      display: none;
      & + .ivu-page-item {
        display: none;
      }
    }

    .ivu-page-item-jump-prev {
      display: none;
    }
  }
}

</style>
