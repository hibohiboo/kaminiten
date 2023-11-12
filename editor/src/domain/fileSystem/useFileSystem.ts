import { atom, useAtom } from 'jotai';
import { getRootDirectoryHandle } from '.';

const objAtom = atom({});

const handleAtom = atom(async () => {
  const tmpHandle = await getRootDirectoryHandle();
  return tmpHandle;
});

export function useFileSystem() {
  const [handle] = useAtom(handleAtom);
  const [text, setText] = useAtom(objAtom);
  const readDirectory = async () => {
    if (!handle) return;
    const files = await handle.values();
    for await (const file of files) {
      setText((prev) => ({ ...prev, [file.name]: file.kind }));
    }
  };
  return { text, readDirectory };
}
