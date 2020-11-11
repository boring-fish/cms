import { HttpRequest } from '../rest/rest.service';

export class EditorService extends HttpRequest {

  saveArticle(body: any) {
    return this.Post('/test/saveArticle', body, {});
  }

  updateArticle(body: any) {
    return this.Put('/test/saveArticle', body, {});
  }

  articleList(params: object) {
    return this.Get('/test/articleList', params);
  }

  count(params: any) {
    return this.Get('/test/count', params);
  }

  article(params: object) {
    return this.Get('/test/article', params);
  }

  uploadToken() {
    return this.Get('/test/getUploadToken', {});
  }
}


















