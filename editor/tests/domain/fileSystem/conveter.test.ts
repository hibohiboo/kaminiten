import { fileNodeStateToTreeNodeInfo } from '@kaminiten-editor/domain/fileSystem/conveter';

/**
 * fileNodeStateToTreeNodeInfoのユニットテスト
 */
describe('fileNodeStateToTreeNodeInfo', () => {
  const state = {
    id: 'test',
    kind: 'directory',
    name: 'test',
    dirPath: '',
    isExpanded: false,
    isSelected: false,
  };
  it('stateが存在する場合、TreeNodeInfoを返す', () => {
    const result = fileNodeStateToTreeNodeInfo(state);
    expect(result).toEqual({
      id: 'test',
      hasCaret: true,
      icon: 'folder-close',
      label: 'test',
      isExpanded: false,
      isSelected: false,
      nodeData: state,
    });
  });
  describe('hasCaretがリーフではfalseになること', () => {
    it('kindがdirectoryの場合、hasCaretがtrueになる', () => {
      const result = fileNodeStateToTreeNodeInfo(state);
      expect(result.hasCaret).toBe(true);
    });
    it('kindがfileの場合、hasCaretがfalseになる', () => {
      const result = fileNodeStateToTreeNodeInfo({
        ...state,
        kind: 'file',
      });
      expect(result.hasCaret).toBe(false);
    });
  });
  describe('iconの設定が正しいこと', () => {
    it('ディレクトリが閉じている場合、iconがfolder-closeになる', () => {
      const result = fileNodeStateToTreeNodeInfo(state);
      expect(result.icon).toBe('folder-close');
    });

    it('ディレクトリが開いている場合、iconがfolder-openになる', () => {
      const result = fileNodeStateToTreeNodeInfo({
        ...state,
        isExpanded: true,
      });
      expect(result.icon).toBe('folder-open');
    });
    it('ファイルの場合、iconがdocumentになる', () => {
      const result = fileNodeStateToTreeNodeInfo({ ...state, kind: 'file' });
      expect(result.icon).toBe('document');
    });
  });
  describe('子要素が存在する場合、再帰的に解釈される', () => {
    // 再帰的なテストは難しいので、子要素が存在する場合のみテストする
    it('子要素が存在する場合、childNodeが存在する', () => {
      const result = fileNodeStateToTreeNodeInfo({
        ...state,
        children: [state],
      });
      expect(result.childNodes).toHaveLength(1);
    });
  });
});
