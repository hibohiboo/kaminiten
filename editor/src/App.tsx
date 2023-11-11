import { Button } from '@blueprintjs/core';
import { atom, useAtom } from 'jotai';
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
  const [text, setText] = useAtom(objAtom);
  return (
    <div>
      <Button
        onClick={async () => {
          // FileSystemAPIを使って選択したフォルダ内に含まれるファイル一覧を取得
          let handle: FileSystemDirectoryHandle;
          try {
            handle = await window.showDirectoryPicker();
            console.log(handle);
            if (!handle) return;
          } catch (e) {
            console.log(e);
            return;
          }
          const files = await handle.values();
          for await (const file of files) {
            // ファイル名をキーにしてオブジェクトに追加
            setText((prev) => ({ ...prev, [file.name]: file.kind }));
          }
        }}
      >
        クリックで読み込み
      </Button>
      <pre>{JSON.stringify(text, null, 2)}</pre>
    </div>
  );
}

export default App;
