import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import Vue from 'vue';

// TODO Loading...
let loadingCount: number = 0;
axios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    Vue.prototype.$Spin.show({
      render: (h: any) => {
        return h('div', [
          h('Icon', {
              'class': 'spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 18
              }
          }),
          h('div', 'Loading')
        ]);
      }
    });
    loadingCount++;
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (resp: AxiosResponse) {
    loadingCount--;
    if ( loadingCount === 0 ) {
      Vue.prototype.$Spin.hide();
    }
    return resp;
  },
  function (error: AxiosError) {
    loadingCount--;
    if ( loadingCount === 0 ) {
      Vue.prototype.$Spin.hide();
    }
    return Promise.reject(error.response);
  }
);

export default axios;
