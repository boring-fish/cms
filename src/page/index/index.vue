<template>
  <div class="index-warp">
    <SideNav class="side-nav"/>
    <router-view class="wrapper"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import moment from 'moment';
import { v4 as UUID } from 'uuid';
import { SideNav } from '@/components';
@Component({
  components: {
    SideNav
  }
})



export default class Index extends Vue {
  created() {
    
  }
}
</script>

<style lang="less">
.index-warp {
  height: 100%;
  display: flex;
  .side-nav{
    position: relative;
    height: 100%;
    width: 40px;
  }
  .wrapper {
    height: 100%;
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
