<template>
      <!-- 字段映射 -->
     <div class="field">
        <Modal v-model="field.fieldStatus" width="360" :transfer="false"  @on-ok='submit'>
        <p slot="header" >
            <span style="margin-left:10px">{{field.title}}</span>
        </p>
         <p>{{field.title}}：</p>
         <div class="field-total">
           <div class="field-item" v-for="(item,index) in fieldList" :key="index">
             <p class="field-item-name">{{item.name}}</p>
             <div class="field-item-select">
                 <Select v-model="item.value" style="width:200px">
                    <Option v-for="items in item.selectList" :value="items.value" :key="items.value">{{ items.label }}</Option>
                </Select>
             </div>
           </div>
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
export default class PageField extends Vue {
  private QRCode: any;
  field: any = {
  fieldStatus: false,
  fieldLink: ''

  };
  fieldList: any = [
    {
      name: '姓名',
      value: '',
      selectList: [
         {
            value: 'New York',
            label: 'New York'
          },
      ]
    },
     {
      name: '手机',
      value: '',
      selectList: [
         {
            value: 'New York',
            label: 'New York'
          },
      ]
    },
     {
      name: '日期',
      value: '',
      selectList: [
         {
            value: 'New York',
            label: 'New York'
          },
      ]
    },
     {
      name: '通讯地址',
      value: '',
      selectList: [
         {
            value: 'New York',
            label: 'New York'
          },
      ]
    },
     {
      name: '邮箱',
      value: '',
      selectList: [
         {
            value: 'New York',
            label: 'New York'
          },
      ]
    }
  ];
  @Prop({
    required: false,
    default: {}
  }) fields!: any;
   @Watch('fields')
  fieldsChange(newval: any, oldval: any) {
   this.field = newval;
  }
  submit() {
    console.log(this.fieldList);
  }
  mounted() {
  }
  created() {}
}
</script>

<style lang="less">
   .field{
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
       .field-total{
         margin-top:10px;
         .field-item{
           display: flex;
           margin-top:8px;
           .field-item-name{
             width: 60px;
           }
           .field-item-select{
             margin-left:30%;
             vertical-align: middle;
            .ivu-select{
              width: 330px !important;
            }
           }
         }
       }
      }
</style>
