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
  return { obj, readRootDirectory };
}
