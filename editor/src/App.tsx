import { Button } from '@blueprintjs/core';
import { useFileSystem } from './hooks/useFilesystemHooks';

function App() {
  const fs = useFileSystem();
  return (
    <div>
      <Button onClick={fs.readRootDirectory}>クリックで読み込み</Button>
      <pre>{JSON.stringify(fs.obj, null, 2)}</pre>
    </div>
  );
}

export default App;
