<template>
    <div class="checkbox-item">
     <Form label-position="top" :model="checkboxData">
       <FormItem :label="addCheckboxData.name" prop='name' :rules=" [
              { required: addCheckboxData.requireData},
          ]">
             <CheckboxGroup v-model="checkboxData.name">
                <Checkbox :label="item.optionName" v-for='(item,index) in addCheckboxData.list' :key="item+index" >{{item.optionName}}
                   <Input v-model="item.other" v-if="item.other"  />
                </Checkbox>
            </CheckboxGroup>
        </FormItem>
     </Form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';

@Component({
  components: {
   
  }
})



export default class CheckboxCol extends Vue {
  checkboxData = {
    name: []
  };
@Prop({
    required: false,
    default: function() {
            return {};
        }
  }) addCheckboxData: any;
   @Watch('addCheckboxData', { deep: true })
  addCheckboxDataChange(newval: any, oldval: any) {
    console.log(newval, oldval);
  }
  created() {
  }
}
</script>

<style lang="less">
 .checkbox-item{
   .ivu-form-item-required .ivu-form-item-label:after {
    content: '' ! important;
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
}
     .ivu-checkbox-wrapper {
    display: block;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #395069;
    line-height: 20px;
    .ivu-input-wrapper {
    display: inline;
    }
    .ivu-input {
    width: 226px;
    background: #F8F8F8;
    border-radius: 4px ;
    border: 1px solid #D4DBE1;
    margin-left:10px;
}
    
 }
   
 }    
</style>
