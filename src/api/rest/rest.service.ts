import axios from './rest.axios';
import { AxiosRequestConfig } from 'axios';

export class HttpRequest {
  protected Post(
    url: string,
    body: Object,
    params: Object,
    headers?: Object,
    noLoading: boolean = false,
  ): Promise<any> {
    return this.request(
      {
        method: 'POST',
        url: url,
        data: body,
        params: params,
        headers: headers,
      },
      {
        noLoading: noLoading
      }
    );
  }

  protected Get(
    url: string,
    params: Object,
    noLoading: boolean = false,
  ): Promise<any> {
    return this.request(
      {
        method: 'GET',
        url: url,
        params: params
      },
      {
        noLoading: noLoading
      }
    );
  }

  protected DownLoad(
    url: string,
    params: Object,
    noLoading: boolean = false,
  ): Promise<any> {
    return this.request(
      {
        method: 'GET',
        url: url,
        params: params,
        responseType: 'blob'
      },
      {
        noLoading: noLoading
      }
    );
  }

  protected Put(
    url: string,
    body: Object,
    params: Object,
    noLoading: boolean = false,
    cancelToken = null
  ): Promise<any> {
    return this.request(
      {
        method: 'PUT',
        url: url,
        data: body,
        params: params,
      },
      {
        noLoading: noLoading
      }
    );
  }

  protected Delete(
    url: string,
    params = null,
    noLoading: boolean = false,
  ): Promise<any> {
    return this.request(
      {
        method: 'DELETE',
        url: url,
        params: params,
      },
      {
        noLoading: noLoading
      }
    );
  }

  public buildUrlWithParams(url: any, params: any) {
    let paramItem = [];
    for (let key in params || {}) {
      if (params[key] instanceof Array) {
        for (let one of params[key]) {
          paramItem.push(
            `${encodeURIComponent(key.toString())}=${encodeURIComponent(one.toString())}`
          );
        }
      } else if (params[key] !== null && params[key] !== undefined) {
        paramItem.push(
          `${encodeURIComponent(key.toString())}=${encodeURIComponent(params[key].toString())}`
        );
      }
    }
    if (paramItem.length > 0) {
      return `${url}?${paramItem.join('&')}`;
    } else {
      return url;
    }
  }

  public request(
    config: AxiosRequestConfig,
    options?: { noLoading?: boolean }
  ): Promise<any> {
    config.headers = Object.assign(this.getHeaders(), config.headers);
    config = Object.assign(config, options);
    config.paramsSerializer = params => {
      let paramItem = [];
      for (let key in params || {}) {
        if (params[key] instanceof Array) {
          for (let one of params[key]) {
            paramItem.push(
              `${encodeURIComponent(key.toString())}=${encodeURIComponent(one.toString())}`
            );
          }
        } else if (params[key] !== null && params[key] !== undefined) {
          paramItem.push(
            `${encodeURIComponent(key.toString())}=${encodeURIComponent(
              params[key].toString()
            )}`
          );
        }
      }
      return paramItem.join('&');
    };

    return axios.request(config).then(rsp => {
      return rsp.data;
    });
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }
}