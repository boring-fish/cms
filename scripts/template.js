const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：npm run tep ${capPirName}')
  process.exit(0)
}

/**
 * @msg: vue页面模版
 */
const VueTep = `<template>
  <div class="${dirName.toLocaleLowerCase()}-wrap">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import {  } from '@/components'; // 组件

@Component({})
export default class ${dirName} extends Vue {

}
</script>

<style lang="scss">

</style>
`


fs.mkdirSync(`${basePath}/page/${dirName}`) // mkdir

process.chdir(`${basePath}/page/${dirName}`) // cd views
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 

process.exit(0)