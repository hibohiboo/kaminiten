import { Tree } from '@blueprintjs/core';
import { useFileSystem } from '@kaminiten-editor/hooks/useFilesystemHooks';

function FileTree() {
  const fs = useFileSystem();
  return (
    <div>
      <Tree
        contents={fs.treeData}
        onNodeClick={fs.handleNodeClick}
        onNodeExpand={fs.handleNodeExpand}
        onNodeCollapse={fs.handleNodeCollapse}
      />
    </div>
  );
}

export default FileTree;
