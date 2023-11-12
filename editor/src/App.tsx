import { Button, Tree } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';
import FileTree from './components/FileSystem/FileTree';

function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
      <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
      <Tree contents={fs.treeData} />
      <FileTree />
    </div>
  );
}

export default App;
