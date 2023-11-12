import { Button } from '@blueprintjs/core';
import { atom, useAtom } from 'jotai';
import { getRootDirectoryHandle, readDirectory } from './domain/fileSystem';
declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}
interface FileSystemDirectoryHandle {
  values(): AsyncIterableIterator<FileSystemFileHandle>;
}
const objAtom = atom({});

function App() {
  const [obj, setObj] = useAtom(objAtom);
  return (
    <div>
      <Button
        onClick={async () => {
          const handle = await getRootDirectoryHandle();
          const ls = await readDirectory(handle);
          setObj(ls);
        }}
      >
        クリックで読み込み
      </Button>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
    </div>
  );
}

export default App;
