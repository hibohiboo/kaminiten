import { Button } from '@blueprintjs/core';
import { FileTree } from './components/FileSystem/FileTree';
import { useFileSystem } from './hooks/useFilesystemHooks';

function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
      <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
      <FileTree data={fs.treeData} />
    </div>
  );
}

export default App;
