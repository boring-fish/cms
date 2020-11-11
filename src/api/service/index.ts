import { EditorService } from './editor.serivce';

export class ApiService {
  editorService: EditorService;

  constructor() {
    this.editorService = new EditorService();
  }
}