import { updateCollapseFileNodeState } from '@kaminiten-editor/domain/fileTree/collapse';
const defaultNode = {
  id: 'test',
  kind: 'directory',
  name: 'test',
  dirPath: '',
  isExpanded: false,
  isSelected: false,
};
describe('updateCollapseFileNodeState', () => {
  describe('選択したパスのフォルダを閉じること', () => {
    it('1階層', async () => {
      const fsNodes = [
        {
          ...defaultNode,
          isExpanded: true,
        },
      ];
      const nodePath = [0];
      const result = await updateCollapseFileNodeState(fsNodes, nodePath);
      expect(result[0].isExpanded).toBe(false);
    });
    it('2階層', async () => {
      const fsNodes = [
        {
          ...defaultNode,
          isExpanded: true,
          isSelected: false,
          children: [
            {
              ...defaultNode,
              id: 'test/sample',
              name: 'sample',
              dirPath: 'test',
            },
            {
              ...defaultNode,
              id: 'test/sample2',
              kind: 'directory',
              name: 'sample2',
              dirPath: 'test',
              isExpanded: true,
            },
          ],
        },
      ];
      const i = 0;
      const j = 1;
      const nodePath = [i, j];
      const result = await updateCollapseFileNodeState(fsNodes, nodePath);
      expect(result[i].children![j].isExpanded).toBe(false);
    });
  });
});
