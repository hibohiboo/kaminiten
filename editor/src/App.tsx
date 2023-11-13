import { Button } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import { useAtom } from 'jotai';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FileTree from './components/FileSystem/FileTree';
import { textFileAtom } from './domain/selectFile/fileAtom';
function App() {
  const fs = useFileSystem();
  const [text] = useAtom(textFileAtom);
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
