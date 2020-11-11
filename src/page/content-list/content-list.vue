<template>
  <div class="content-list content-container">
    <div class="content-header">
      <div class="left-panel">
        <span>{{ title }}</span>
      </div>
      <div class="right-panel">
        <div class="panel-item">
          <Button type="primary" icon="md-add" @click="goEditor()">新建</Button>
        </div>
        <div class="panel-item">
          <Input prefix="ios-search" placeholder="根据图文标题搜索" @on-enter="onSearch" v-model="keyWord" @on-change="onKeyWordChange"/>
        </div>
      </div>
    </div>
    <div class="content-body">
      <Table 
        :columns="tableModel.columns" 
        :data="tableModel.records"
      ></Table>
    </div>
    <div class="cover-view" v-show="coverViewFlag">
      <img :src="coverView" alt="">
      <div class="cover-view-close" @click.stop.prevent="closeCoverView">
        <Icon type="md-close" />
      </div>
    </div>
    <Modal
      v-model="detailModal"
      class="detail-modal"
      title="图文地址"
      width="600"
    >
      <div class="detail-modal-content">
        <Input disabled v-model="currentUrl">
            <Icon type="md-copy" slot="suffix" class="clipboard" @click="copyUrl"/>
        </Input>
        <p class="qrcode-title">图文二维码：</p>
        <div id="qrcode">

        </div>
      </div>
    </Modal>
    <div class="content-footer">
      <nz-pagination :total="pageModel.total" :current="pageModel.current" :pageSize="pageModel.size"
        @goto-page="gotoPage">
      </nz-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';
import moment from 'moment';
import { v4 as UUID } from 'uuid';
import Clipboard from 'clipboard';
import qrCode from 'qrcodejs2';
import { NzPagination } from '@/components';
@Component({
  components: {
    NzPagination
  }
})



export default class ContentList extends Vue {
  title: string = 'CMS素材中心';
  detailModal: boolean = false;
  currentUrl: string = '';
  keyWord: string = '';
  tableModel: any = {
    columns: [
      {
        title: 'ID',
        key: 'id'
      },
      {
        title: '封面图',
        key: 'cover',
        render: (h: any, params: any) => {
          return h('div', [
            h('img', {
              class: 'cover-img',
              attrs: {
                src: `${window.location.protocol}//${params.row.cover}`
              },
              on: {
                click: () => {
                  this.viewCover(params.row.cover);
                }
              }
            })
          ]);
        }
      },
      {
        title: '图文标题',
        key: 'title'
      },
      {
        title: '状态',
        key: 'is_active',
        render: (h: any, params: any) => {
          return h('div', [
            h('div', {
              class: params.row.is_active === 'ACTIVE' ? 'status active' : 'status draft'
            }, params.row.is_active === 'ACTIVE' ? '已发布' : '未发布')
          ]);
        }
      },
      {
        title: '创建时间',
        key: 'date_created'
      },
      {
        title: '更新时间',
        key: 'last_updated'
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h: any, params: any) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'text',
                // size: 'small',
                icon: ' nz-s-dp-edit'
              },
              attrs: {
                title: '编辑',
              },
              on: {
                click: () => {
                  this.goEditor(params.row.article_id);
                }
              }
            }),
            h('Button', {
              class: params.row.is_active === 'ACTIVE' ? '' : 'none',
              props: {
                type: 'text',
                // size: 'small',
                icon: ' nz-analytics-article'
              },
              attrs: {
                title: '查看详情',
              },
              on: {
                click: () => {
                  this.getArticleUrl(params.row);
                }
              }
            }),
            h('Button', {
              props: {
                type: 'text',
                // size: 'small',
                icon: ' nz-delete'
              },
              attrs: {
                title: '删除',
              },
              on: {
                click: () => {
                  this.delArticle(params.row);
                  // this.remove(params.index)
                }
              }
            })
          ]);
        }
      }
    ],
    records: [
    ]
  };
  pageModel: any = {
    total: 0,
    current: 0,
    size: 50
  };
  coverView: string = '';
  coverViewFlag: boolean = false;

  created() {
    this.loadList();
    this.loadCount();
  }

  closeCoverView() {
    this.coverViewFlag = false;
  }

  viewCover(url: string) {
    this.coverView = `${window.location.protocol}//${url}`;
    this.coverViewFlag = true;
  }

  delArticle(data: object) {
    this.$Modal.confirm({
      title: '确认删除',
      content: '确认删除',
      onOk: () => {
        console.log(1);
      },
      onCancel: () => {
        console.log('del article on cancel');
      }
    });
  }

  getArticleUrl(row: any) {
    this.currentUrl = `${window.location.origin}/page/${row.article_id}`;
    let url = this.currentUrl;
    (document.getElementById('qrcode') as any).innerHTML = '';
    let qrcode = new qrCode('qrcode', {
      width: 124,
      height: 124,
      text: url,
    });
    this.detailModal = true;
  }

  copyUrl() {
    let url = this.currentUrl;
    const clipboard = new Clipboard('.clipboard', {
      text() {
        return url;
      }
    });
    clipboard.on('success', e => {
      e.clearSelection();
      clipboard.destroy();
      this.$Message.success('复制成功');
    });
  }

  onRowClick(row: any) {
    this.$router.push(`/edit/${row.article_id}`);
  }

  gotoPage(page: number) {
    this.pageModel.current = page;
    this.loadList();
  }

  onSearch(val: string) {
    this.loadList(this.keyWord);
    this.loadCount(this.keyWord);
  }

  loadList(keyWord?: string) {
    let query: any = {
      page: this.pageModel.current,
      size: this.pageModel.size,
    };
    if ( keyWord ) {
      this.pageModel.current = 0;
      query.page = 0;
      query['searchKey'] = keyWord;
    }
    $api.editorService.articleList(query).then( res => {
      console.log(res);
      this.tableModel.records = res;
    });
  }

  loadCount(keyWord?: string) {
    let query: any = {};
    if ( keyWord ) {
      query['searchKey'] = keyWord;
    }
    $api.editorService.count(query).then( res => {
      this.pageModel.total = Number(res);
    });
  }
  onKeyWordChange() {
    if ( !this.keyWord ) {
      this.loadList();
      this.loadCount();
    }
  }

  goEditor(uuid?: string) {
    if ( uuid ) {
      // this.$router.push(`/edit/${uuid}`);
      // this.$router.push(`/EditForm/`);
    } else {
      this.$router.push(`/edit/${UUID()}`);
      // this.$router.push(`/EditForm/${UUID()}`);
       this.$router.push(`/FormManageCenter/${UUID()}`);


    }
  }
}
</script>

<style lang="less">
.detail-modal-content{
  .qrcode-title{
    font-size: 16px;
    margin: 12px 0;
  }
  #qrcode{
    width: 124px;
    height: 124px;
    margin: 12px auto;
  }
  .clipboard{
    cursor: pointer;
  }
}
.index-warp {
  height: 100%;
  .cover-view{
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.59);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 1000;
    position: fixed;
    img{
      position: absolute;
      top: 0;bottom: 0;left: 0;right: 0;
      margin: auto;
    }
    &-close{
      width: 40px;
      height: 40px;
      background:rgba(0,0,0,0.8);
      border-radius:2px;
      font-size: 24px;
      line-height: 40px;
      position: absolute;
      top: 12px;
      right: 16px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
  .ivu-table-wrapper{
    .none{
      display: none;
    }
    .cover-img{
      width: 40px;
      height: 40px;
    }
    .status{
      width: 55px;
      height: 24px;
      text-align: center;
      font-size: 12px;
      line-height: 24px;
      border-radius: 4px;
      color: #fff;
    }
    .ivu-table-cell{
      i{
        margin-top: -2px;
        margin-left: -8px;
      }
    }
    .active{
      background:rgba(0,178,166,1);
    }
    .draft{
      background:rgba(198,201,207,1);
    }
  }
}
</style>
