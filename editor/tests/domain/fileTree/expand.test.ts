import { updateFileNodeState } from '@kaminiten-editor/domain/fileTree/expand';

// editor/src/domain/fileTree/expand.ts
describe('updateFileNodeState', () => {
  describe('選択したパスのフォルダを開くこと', () => {
    it('1階層', async () => {
      const fsNodes = [
        {
          id: 'test',
          kind: 'directory',
          name: 'test',
          dirPath: '',
          isExpanded: false,
        },
      ];
      const node = fsNodes[0];
      const result = await updateFileNodeState(node.id as string, fsNodes);
      expect(result[0].isExpanded).toBe(true);
    });
    it('2階層', async () => {
      const fsNodes = [
        {
          id: 'test',
          kind: 'directory',
          name: 'test',
          dirPath: '',
          isExpanded: false,
          children: [
            {
              id: 'test/sample',
              kind: 'directory',
              name: 'sample',
              dirPath: 'test',
              isExpanded: false,
            },
            {
              id: 'test/sample2',
              kind: 'directory',
              name: 'sample2',
              dirPath: 'test',
              isExpanded: false,
            },
          ],
        },
      ];
      const result = await updateFileNodeState('test/sample2', fsNodes);
      expect(result[0].isExpanded).toBe(false);
      expect(result[0].children![0].isExpanded).toBe(false);
      expect(result[0].children![1].isExpanded).toBe(true);
    });
  });
});
