import { updateClickFileNodeState } from '@kaminiten-editor/domain/fileTree/click';

const defaultNode = {
  id: 'test',
  kind: 'document',
  name: 'test',
  dirPath: '',
  isExpanded: false,
  isSelected: false,
};
describe('updateClickFileNodeState', () => {
  describe('選択したパスをtrueにすること', () => {
    it('1階層', async () => {
      const fsNodes = [
        {
          ...defaultNode,
          isSelected: false,
        },
      ];
      const result = await updateClickFileNodeState('test', fsNodes);
      expect(result[0].isSelected).toBe(true);
    });
  });
});
