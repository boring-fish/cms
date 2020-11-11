<template>
  <div class="setting-item">
    <Form label-position="top" :model="uploadData">
      <FormItem :label="addUploadData.name" prop="name" class="upload-form" :rules=" [
              { required: addUploadData.requireData},
          ]">
        <p class="ts-infor">最多上传3张图片和1个视频</p>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg', 'jpeg', 'png','mp4','avi']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:100px;"
        >
          <div style="width: 100px;height:100x;line-height: 100px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <div
          class="demo-upload-list"
          v-for="(item, index) in uploadList"
          :key="index"
        >
          <template v-if="item.status === 'finished'">
            <img v-if="item.type!=='video/mp4'" :src="item.url" />
            <iframe v-else :src="item.url" frameborder="0"></iframe>
            <div class="demo-upload-list-cover">
              <Icon
                type="ios-trash-outline"
                @click.native="handleRemove(item)"
              ></Icon>
            </div>
          </template>
          <template v-else>
            <Progress
              v-if="item.showProgress"
              :percent="item.percentage"
              hide-info
            ></Progress>
          </template>
        </div>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch} from 'vue-property-decorator';


@Component({
  components: {},
})
export default class UploadCol extends Vue {
  uploadData = {
    name: '',
  };
  defaultList = [
    // {
    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
    // },
    // {
    //     'name': 'bc7521e033abdd1e92222d733590f104',
    //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
    // }
  ];
  imgName = '';
  visible = false;
  uploadList: any = [];
  @Prop({
    required: false,
    default: {}
  }) addUploadData: any;
   @Watch('addUploadData', { deep: true })
  addUploadDataChange(newval: any, oldval: any) {
    console.log(newval, oldval);
  }
  // handleView(name: any) {
  //   this.imgName = name;
  //   this.visible = true;
  // }
  handleRemove(file: any) {
    const fileList = this.uploadList;
    this.uploadList.splice(fileList.indexOf(file), 1);
    console.log( this.uploadList);
  }
  handleSuccess(res: any, file: any) {
    console.log(res, file);
    // file.url =
    //   'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
    // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
  }
  handleFormatError(file: any) {
     console.log('格式错误');
    this.$Notice.warning({
      title: '图片和视频格式',
      desc:
        '文件 ' +
        file.name +
        ' 格式错误,请选择 jpg、png、mp4、avi格式',
    });
  }
  handleMaxSize(file: any) {
    console.log('超额');
    this.$Notice.warning({
      title: '文件内存超额',
      desc: '文件  ' + file.name + ' 不能超过2M.',
    });
  }
  handleBeforeUpload(file: any) {
    const check = this.uploadList.length < 5;
    if (this.uploadList.length > 5) {
      this.$Notice.warning({
        title: '最多上传3张图片和1个视频',
      });
      return false;
    }
    if (window.URL !== undefined) {
      file.url = window.URL.createObjectURL(file);
    } 
  console.log(file);
    this.uploadList.push({
      status: 'finished',
      name: file.name,
      showProgress: true,
      url: file.url,
      percentage: 100,
      type: file.type
    });
    console.log(this.uploadList);
    return false;
  }
  mounted() {
    // console.log(this.$refs.upload);
    // this.uploadList = this.$refs.upload.defaultFileList;
  }
  created() {}
}
</script>

<style lang="less">
.setting-item {
  .ivu-radio-wrapper {
    display: block;
  }
  .demo-upload-list {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-left: 10px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 40px 2px;
  }
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .ivu-icon {
    vertical-align: middle !important;
  }
  .ts-infor{
    width: 156px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8494A6;
    line-height: 17px;
    position: absolute;
    left: 90px;
    top: -30px;
  }
}
</style>
