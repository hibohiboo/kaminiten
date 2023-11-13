import { Button } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import { useAtom } from 'jotai';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useEffect, useState } from 'react';
import FileTree from './components/FileSystem/FileTree';
import { fileAtom } from './domain/selectFile/fileAtom';
function App() {
  const fs = useFileSystem();
  const [text, setText] = useState('');
  const [file] = useAtom(fileAtom);
  useEffect(() => {
    (async function read() {
      if (file) {
        const text = await file.text();
        setText(text);
      }
    })();
  });
  // const text = await file.text();
  return (
    <div>
      <Splitter>
        <SplitterPanel size={20}>
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
            <FileTree /> <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
          </div>
        </SplitterPanel>
        <SplitterPanel size={80}>{text}</SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
