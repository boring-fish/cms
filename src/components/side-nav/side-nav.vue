<template>
  <div id="sidenav-menu">
    <div class="logo"></div>
    <Menu :active-name="openName" theme="dark" width="40" accordion @on-select="changeRoute">
      <template v-for="route in navRouter">
        <Menu-Item
          :data-uat-key="route.name"
          :name="route.name"
          class="sidenav-menu-item"
          :key="route.name"
        >
          <Tooltip
            :content="route.title"
            placement="right"
            :key="route.name"
            :transfer="true"
          >
            <Icon class="sidenav-menu-icon navmenu-icon-size" :type="route.icon"></Icon>
          </Tooltip>
        </Menu-Item>
      </template>
    </Menu>
  
    <div class="sidenav-menu-bottom">
      <div class="sidenav-menu-item">
        <Tooltip placement="right-end" :transfer="true" theme="light">
          <div class="sidenav-menu-avatar">
            <Avatar icon="ios-person"></Avatar>
          </div>
          <div slot="content" id="sidenav-user-tooltip">
            <div
              data-uat-key="logoutBtn"
              @click.stop.prevent="logout"
              class="tooltip-item tooltip-item-special"
            >
              <!-- <Icon class="sidenav-menu-icon navmenu-icon-size" custom="nz-logout"></Icon> -->
              <span>登出</span>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  }
})



export default class SideNav extends Vue {

  get openName() {
    let last: any = this.$route.matched[this.$route.matched.length - 1].parent || {};
    let open = this.$route.name;

    if (last['path']) {
      open = last['name'];
    }
    console.log(open, 'open');
    return open;
  }
  navRouter: any[] = [
    {
      name: 'list',
      icon: 'md-home',
      title: '素材中心',
      path: '/list',
    }
  ];

  created() {

  }
  
  changeRoute(active: string) {
    console.log(active, 'active');
    this.$router
      .push({
        name: active
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  logout() {

  }
  
}
</script>

<style lang="less">
#sidenav-menu {
  position: relative;
  background-color: @nz-color-nav-bg; // padding-top: 48px;
  // overflow: hidden;
  .cutting-line {
    height: 1px;
    width: 14px;
    margin: 6px auto;
    background: #476886;
  }

  .sidenav-menu-item {
    border-right: 2px solid @nz-color-nav-bg;
    background-color: @nz-color-nav-bg;
    padding: 0;
    color: @nz-color-nav-text;

    &:hover {
      color: @nz-color-main-primary;
      //border-right: 2px solid @nz-color-block-bg;
    }
  }

  .sidenav-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
    //background-color: #184d87;
    color: @nz-color-active;
  }

  .sidenav-menu-icon,
  .sidenav-menu-avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
  }

  .sidenav-menu-bottom {
    position: absolute;
    width: 40px;
    bottom: 10px;
  }

  .logo {
    width: 32px;
    height: 32px;
    margin: 14px 4px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: rgba(255, 255, 255, 0.2);
    background-position-x: center;
    background-image: url('../../assets/img/favicon.png');
  }

  .sidenav-menu-avatar {
    .ivu-avatar {
      background: rgba(255, 255, 255, 0.2);
      color: @nz-color-title-text;
    }
  }
}

#sidenav-user-tooltip {
  width: 212px;
  height: auto;
  padding: 0 10px;
  box-sizing: border-box;

  .tooltip-item {
    cursor: pointer;
    padding: 11.5px 0;
    // border-top: 1px solid @nz-color-border-secondary;
    font-size: 0;
    font-family: Helvetica;
    color: @nz-color-text-secondary;
    letter-spacing: 0.07px;
    text-align: left;

    span {
      display: inline-block;
      vertical-align: top;
      font-size: 16px;
    }

    .user-account-email {
      width: 90%;
    }

    &-special {
      span {
        margin-left: 9.5px;
        vertical-align: middle;
      }
    }
  }

  .user-menu {
    padding-top: 9.5px;
    padding-bottom: 8px;
    opacity: 1;
    border-top: 1px solid rgba(151, 151, 151, 0.3);
    display: flex;

    .menu-item {
      margin-right: 30px;
      color: @nz-color-text-primary;
      letter-spacing: 0.07px;
      text-align: center;

      .menu-item-icon {
        width: 36px;
        height: 36px;
        border-radius: 36px;
        border: 1px solid #eaeaea;
        text-align: center;
        line-height: 36px;

        i {
          font-size: 14px;
        }

        &:hover {
          color: @nz-color-main-primary-hover;
          border-color: @nz-color-main-primary-hover;
        }
      }

      span {
        margin-top: 7px;
        display: block;
      }
    }
  }

  .user-account {
    padding-bottom: 9px;
    border-top: none;
    font-size: 14px;
    position: relative;
    .user-account-item {
      color: @nz-color-placeholder;
      label {
        width: 72px;
        display: inline-block;
      }
      span {
        color: @nz-color-text-primary;
        vertical-align: middle;
        margin-top: -1px;
        width: 111px;
      }
    }
    .copy {
      position: absolute;
      top: 50%;
      left: 100%;
      transform: translate(-50%, -50%);
    }
  }
}

</style>
