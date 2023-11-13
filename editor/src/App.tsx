import { Button } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FileTree from './components/FileSystem/FileTree';
function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Splitter>
        <SplitterPanel size={20}>
          <div style={{ height: '100vh', overflowY: 'auto' }}>
            <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
            <FileTree /> <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
          </div>
        </SplitterPanel>
        <SplitterPanel size={80}>Panel 2</SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
