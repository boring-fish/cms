<template>
    <div class="checkbox-item">
     <Form label-position="top" :model="singleData">
       <FormItem :label="addSingleData.name" prop='name' :rules=" [
              { required: addSingleData.requireData},
          ]">
             <Input v-model="singleData.name" :maxlength="addSingleData.num" show-word-limit />
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



export default class SingleLineText extends Vue {
  singleData = {name: ''};
@Prop({
    required: false,
    default: {}
  }) addSingleData: any;
   @Watch('addSingleData', { deep: true })
  addSingleDataChange(newval: any, oldval: any) {
    console.log(newval, oldval);
  }
  created() {

  }
  
  
  
}
</script>

<style lang="less">
 .checkbox-item{
   .ivu-checkbox-group-item {
    display: block;
 }
 }    
</style>
