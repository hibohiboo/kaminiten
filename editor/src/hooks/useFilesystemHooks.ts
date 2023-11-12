import { type TreeNodeInfo } from '@blueprintjs/core';
import { atom, useAtom } from 'jotai';
import { getRootDirectoryHandle, readDirectory } from '../domain/fileSystem';

const objAtom = atom({});
export function useFileSystem() {
  const [obj, setObj] = useAtom(objAtom);
  const readRootDirectory = async () => {
    const handle = await getRootDirectoryHandle();
    const ls = await readDirectory(handle);
    setObj(ls);
  };
  const treeData: TreeNodeInfo[] = [
    {
      id: 0,
      hasCaret: true,
      icon: 'folder-close',
      label: 'Folder 0',
    },
  ];
  return { obj, readRootDirectory, treeData };
}
