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
  };
  it('stateが存在する場合、TreeNodeInfoを返す', () => {
    const result = fileNodeStateToTreeNodeInfo(state);
    expect(result).toEqual({
      id: 'test',
      hasCaret: true,
      icon: 'folder-close',
      label: 'test',
      isExpanded: false,
      nodeData: state,
    });
  });
  it('ディレクトリが開いている場合、iconがfolder-openになる', () => {
    const result = fileNodeStateToTreeNodeInfo({ ...state, isExpanded: true });
    expect(result.icon).toBe('folder-open');
  });
  it('ファイルの場合、iconがdocumentになる', () => {
    const result = fileNodeStateToTreeNodeInfo({ ...state, kind: 'file' });
    expect(result.icon).toBe('document');
  });
});
