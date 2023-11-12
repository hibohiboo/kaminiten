import {
  getDirectoryHandle,
  getRootDirectoryHandle,
  readDirectory,
} from '@kaminiten-editor/domain/fileSystem';
import { updateFileNodeState } from '@kaminiten-editor/domain/fileTree/expand';
jest.mock('@kaminiten-editor/domain/fileSystem');
const mockedHandler = jest.mocked(getDirectoryHandle);
const mockedRootHandler = jest.mocked(getRootDirectoryHandle);
const mockedReadDirectory = jest.mocked(readDirectory);

describe('updateFileNodeState', () => {
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
  describe('選択したパスのフォルダを開くこと', () => {
    afterEach(() => {
      jest.clearAllMocks(); // テストファイル内のspyOnされている関数を全てmockClear()する
    });
    it('1階層', async () => {
      const fsNodes = [
        {
          id: 'test',
          kind: 'directory',
          name: 'test',
          dirPath: '',
          isExpanded: false,
          children: [],
        },
      ];
      const node = fsNodes[0];
      const result = await updateFileNodeState(node.id as string, fsNodes);
      expect(result[0].isExpanded).toBe(true);
    });
    it('2階層', async () => {
      mockedReadDirectory.mockImplementation(async () => []);
      const result = await updateFileNodeState('test/sample2', fsNodes);
      expect(result[0].isExpanded).toBe(false);
      expect(result[0].children![0].isExpanded).toBe(false);
      expect(result[0].children![1].isExpanded).toBe(true);
    });
  });
  it('選択したフォルダの子がないときに追加すること', async () => {
    mockedReadDirectory.mockImplementation(async () => []);
    const result = await updateFileNodeState('test/sample2', fsNodes);
    expect(result[0].children![1].children).toEqual([]);
    expect(mockedHandler.mock.calls.length).toBe(1);
    expect(mockedRootHandler.mock.calls.length).toBe(1);
    expect(mockedReadDirectory.mock.calls.length).toBe(1);
  });
});
