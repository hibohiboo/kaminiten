import { Button } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import FileTree from './components/FileSystem/FileTree';
function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Splitter style={{ height: '300px' }}>
        <SplitterPanel className="flex align-items-center justify-content-center">
          <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
          <FileTree /> <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center">
          Panel 2
        </SplitterPanel>
      </Splitter>
    </div>
  );
}

export default App;
