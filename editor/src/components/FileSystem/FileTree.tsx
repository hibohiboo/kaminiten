import { Tree } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';

function FileTree() {
  const fs = useFileSystem();
  return (
    <div>
      <Tree contents={fs.treeData} />
    </div>
  );
}

export default FileTree;
