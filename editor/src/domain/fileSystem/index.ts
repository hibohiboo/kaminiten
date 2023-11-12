import { FileNodeInfo } from './types';

interface MyFileSystemDirectoryHandle extends FileSystemDirectoryHandle {
  values(): AsyncIterableIterator<FileSystemFileHandle>;
  getDirectoryHandle(
    name: string,
    options?: FileSystemGetDirectoryOptions | undefined,
  ): Promise<MyFileSystemDirectoryHandle>;
}
declare global {
  interface Window {
    showDirectoryPicker(): Promise<MyFileSystemDirectoryHandle>;
  }
}
let rootHandle: MyFileSystemDirectoryHandle;
export async function getRootDirectoryHandle() {
  if (rootHandle) return rootHandle;
  try {
    rootHandle = await window.showDirectoryPicker();
    if (!rootHandle) return null;
    return rootHandle;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const readDirectory = async (
  handle: MyFileSystemDirectoryHandle | null,
  parentDirPath: string,
) => {
  if (!handle) return [];
  const files = await handle.values();
  const ret: FileNodeInfo[] = [];
  for await (const file of files) {
    ret.push({ name: file.name, kind: file.kind, dirPath: parentDirPath });
  }
  return ret;
};
export async function getDirectoryHandle(
  rootHandle: MyFileSystemDirectoryHandle | null,
  path: string,
) {
  if (!rootHandle) return null;
  try {
    const dirs = path.split('/');
    const handle = dirs.reduce(async (acc, dir: string) => {
      const parentHandle = await acc;
      const handle = await parentHandle.getDirectoryHandle(dir);
      return handle;
    }, Promise.resolve(rootHandle));
    if (!handle) return null;
    return handle;
  } catch (e) {
    console.log(e);
    return null;
  }
}
