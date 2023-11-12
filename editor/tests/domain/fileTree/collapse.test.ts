import { updateCollapseFileNodeState } from '@kaminiten-editor/domain/fileTree/collapse';

describe('updateCollapseFileNodeState', () => {
  describe('選択したパスのフォルダを閉じること', () => {
    it('1階層', async () => {
      const fsNodes = [
        {
          id: 'test',
          kind: 'directory',
          name: 'test',
          dirPath: '',
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
          id: 'test',
          kind: 'directory',
          name: 'test',
          dirPath: '',
          isExpanded: true,
          children: [
            {
              id: 'test/sample',
              kind: 'directory',
              name: 'sample',
              dirPath: 'test',
              isExpanded: true,
            },
            {
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
