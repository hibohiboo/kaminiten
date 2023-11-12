import { Button } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import FileTree from './components/FileSystem/FileTree';

function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
      <FileTree /> <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
    </div>
  );
}

export default App;
