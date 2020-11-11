<template>
    <div class="radio-item">
     <Form label-position="top" :model="selectData">
        <FormItem :label="addSelectData.name" prop='name' :rules=" [
              { required: addSelectData.requireData},
          ]">
           <Select v-model="selectData.name"> -->
                <Option :label="item.optionName" v-for='(item,index) in addSelectData.list' :key="index" :value="item.optionName" >{{item.optionName}}
                   <!-- <Input v-model="item.optionName" v-if="item.other"  /> -->
                </Option>
           </Select> 
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



export default class SettingCol extends Vue {
  selectData = {
    name: ''
  };
@Prop({
    required: false,
    default: function() {
            return {};
        }
  }) addSelectData: any;
   @Watch('addSelectData', { deep: true })
  addSelectDataChange(newval: any, oldval: any) {
    console.log(newval, oldval);
  }
  created() {

  }
  
  
  
}
</script>

<style lang="less">
 .radio-item{
   .ivu-radio-wrapper {
    display: block;
 }
 }    
</style>
