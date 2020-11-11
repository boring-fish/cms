<template>
  <div class="setting-item">
    <Form label-position="top" :model="setData" @keydown.native.enter.prevent ="onSubmit">
      <FormItem label="题目" prop="name">
        <Input v-model="setData.name"  />
      </FormItem>
      <FormItem label="选项" prop="option" v-if="lineState">
        <div class="setoptions" v-for="(item,index) in setData.list" :key="index">
          <Input v-model="item.optionName"  /><Icon type="ios-close" size="34" @click="delSetDataList(index)" />
        </div>
        <!-- <Row> -->
          <div span="24" class="subbtn">
            <Button type="success" html-type="button" size="large"  @click="addOption">添加选项</Button >
          </div>
        <!-- </Row> -->
      </FormItem>
      <div class="other" v-if="lineState">
        <Checkbox v-model="setData.otherData"  @on-change='otherEvent'>设置其他选项</Checkbox>
        <!-- <span>(最多输入30个字符)</span>
        <Input v-model="setData.other" /> -->
      </div>
      <div class="other setNum" v-if="fileState">
        <Checkbox v-model="setData.numData"
          >设置字数限制&nbsp;<Input v-model="setData.num" />&nbsp;字</Checkbox
        >
      </div>
      <div>
        <Checkbox v-model="setData.requireData">必填</Checkbox>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class SingleLineText extends Vue {
  
  title = '';
  setData: any = {
    list: [],
    num: 0,
  };
  lineState = true;
  fileState = true;
  idCount = 0;
 @Prop({
    required: false,
    default: {}
  }) lineStatus!: any;
   @Prop({
    required: false,
    default: {}
  }) fileStatus!: any;
  @Watch('lineStatus')
  lineStatusChange(newval: any, oldval: any) {
    console.log(newval, oldval);
    //  if(newval){
      this.lineState = !newval.status;
      this.fileState = newval.status;
      this.idCount = newval.initData.id;
       this.title = newval.type;
          console.log(newval.id);
            this.setData = newval.initData;
  }
  @Watch('fileStatus')
  fileStatusChange(newval: any, oldval: any) {
    console.log(newval, oldval);
    if (newval) {
     this.lineState = this.fileState = !newval.status;
     this.title = newval.type;
     this.idCount = newval.id;
       this.setData = newval.initData;
    }
  }
  otherEvent(data: any) {
    console.log(data);
    if (data) {
        this.setData.list.push({
          optionName: '其他',
        //  other: this.setData.other
      });
    }
  }
  addOption() {
    if (this.setData.otherData) {
      console.log(this.setData.list.length);
      let a = this.setData.list[this.setData.list.length - 1];
      console.log(a);
      this.setData.list.splice(this.setData.list.length - 1, 1);
       this.setData.list.push({
        optionName: '',
    }, a);
    } else {
       this.setData.list.push({
        optionName: '',
    });
    }
   
  }
  delSetDataList(data: any) {
    if (this.setData.list.length > 2) {
      if (data === this.setData.list.length - 1 && this.setData.otherData) {
        this.setData.otherData = false;
      }
       this.setData.list.splice(data, 1);
    } else {
        this.$Modal.warning({
        title: '选项不得少于两个',
      });
    }
   
    console.log( this.setData.list);
  }
  onSubmit(e: any) {
   let reg = /^[1-9]\d*$/;
   if (this.setData.num) {
     if (new RegExp(reg).test(this.setData.num)) {
        this.setData.numData = true;
     } else {
        this.$Modal.warning({
        title: '请输入数字',
      });
      return false;
     }
    
   }
   if (this.setData.numData && this.setData.num === '') {
     this.$Modal.warning({
        title: '请限制字数',
      });
   }
    let keyCode = window.event ? e.keyCode : e.which;
        if (keyCode === 13) {
             this.setData = Object.assign(this.setData, {type: this.title, id: this.idCount});
          this.$emit('setData', this.setData);
          console.log(this.setData);
        }
  }
  created() {}
}
</script>

<style lang="less">
.setting-item {
  .ivu-form-item-label {
    font-family: PingFangSC-Semibold, PingFang SC !important;
    font-weight: 600 !important;
  }
  .ivu-input {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #395069;
    line-height: 20px;
  }
  .setoptions {
    display: flex;
    .ivu-input-wrapper {
      width: 94%;
    }

    .ivu-icon {
      margin-left: 10px;
    }
  }
  .subbtn {  
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      width: 200px;
      height: 32px;
      background: #00b2a6;
      border-radius: 4px;
      line-height: 17px;
    }
  }
  .other {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0a2a4c;
    line-height: 20px;
    .ivu-input-wrapper {
      margin: 10px 0 15px 0;
    }
    span {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8494a6;
      line-height: 17px;
    }
  }
  .setNum {
    .ivu-input-wrapper {
      width: 80px;
    }
  }
}
</style>
