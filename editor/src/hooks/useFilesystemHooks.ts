import { type TreeNodeInfo } from '@blueprintjs/core';
import { atom, useAtom } from 'jotai';
import { getRootDirectoryHandle, readDirectory } from '../domain/fileSystem';
import type { FileNodeInfo } from '../domain/fileSystem/types';

const objAtom = atom<FileNodeInfo[]>([]);
export function useFileSystem() {
  console.log('read');
  const [obj, setObj] = useAtom(objAtom);
  const readRootDirectory = async () => {
    const handle = await getRootDirectoryHandle();
    const ls = await readDirectory(handle, '');
    setObj(ls);
  };
  const treeData: TreeNodeInfo[] = obj.map((item, i) => ({
    id: i,
    hasCaret: true,
    icon: item.kind === 'directory' ? 'folder-close' : 'document',
    label: item.name,
  }));
  return { obj, readRootDirectory, treeData };
}
