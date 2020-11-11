<template>
    <div class="radio-item">
     <Form label-position="top" :model="radioData">
       <FormItem :label="addRadioData.name" prop='name' :rules=" [
              { required: addRadioData.requireData},
          ]">
            <RadioGroup v-model="radioData.name">
                <Radio :label="item.optionName" v-for='(item,index) in addRadioData.list' :key="item+index" >{{item.optionName}}
                   <!-- <Input v-model="radioData.othername" v-if="item.other"  /> -->
                </Radio>
            </RadioGroup>
        </FormItem>
     </Form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  components: {
   
  }
})



export default class RadioCol extends Vue {
  radioData = {
    name: ''
  };
@Prop({
    required: true,
    default: function() {
            return {};
        }
  }) addRadioData: any;
   mounted() {

  }
   @Watch('addRadioData', { deep: true, immediate: true })
  addRadioDataChange(newval: any, oldval: any) {
   
  }

  created() {
    // this.$set(this.addRadioData);
  }
 
  
  
  
  
}
</script>

<style lang="less">
 .radio-item{
   .ivu-radio-wrapper {
    display: block;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #395069;
    line-height: 20px;
    .ivu-input {
    width: 226px;
    background: #F8F8F8;
    border-radius: 4px;
    border: 1px solid #D4DBE1;
    margin-left:10px;
}
 }
 }    
</style>
