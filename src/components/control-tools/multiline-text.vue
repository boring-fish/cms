<template>
    <div class="checkbox-item">
     <Form label-position="top" :model="multData">
       <FormItem :label="addMultData.name" prop='name' :rules=" [
              { required: addMultData.requireData},
          ]">
          <Input v-model="multData.name" :maxlength="addMultData.num" show-word-limit type="textarea"/>
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



export default class MultilineText extends Vue {
  multData = {name: ''};
@Prop({
    required: false,
    default: function() {
            return [];
        }
  }) addMultData: any;
   @Watch('addMultData', { deep: true })
  addMultDataChange(newval: any, oldval: any) {
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
