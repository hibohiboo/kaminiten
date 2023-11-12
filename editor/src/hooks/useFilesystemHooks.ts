import { type TreeNodeInfo } from '@blueprintjs/core';
import { fileNodeStateToTreeNodeInfo } from '@kaminiten-editor/domain/fileSystem/conveter';
import { updateCollapseFileNodeState } from '@kaminiten-editor/domain/fileTree/collapse';
import { updateFileNodeState } from '@kaminiten-editor/domain/fileTree/expand';
import { atom, useAtom } from 'jotai';
import React from 'react';
import { getRootDirectoryHandle, readDirectory } from '../domain/fileSystem';
import type { FileNodeState } from '../domain/fileSystem/types';

const fsNodeAtom = atom<FileNodeState[]>([]);
export function useFileSystem() {
  const [fsNodes, setObj] = useAtom(fsNodeAtom);
  const readRootDirectory = async () => {
    const handle = await getRootDirectoryHandle();
    const ls = await readDirectory(handle, '');
    setObj(ls.map((item) => ({ ...item, isExpanded: false, id: item.name })));
  };
  const treeData: TreeNodeInfo[] = fsNodes.map(fileNodeStateToTreeNodeInfo);
  const handleNodeClick = React.useCallback(
    (
      node: TreeNodeInfo,
      nodePath: number[],
      e: React.MouseEvent<HTMLElement>,
    ) => {
      console.log('click');
      console.log(node);
      console.log(nodePath);
      console.log(e);
    },
    [],
  );
  const handleNodeExpand = React.useCallback(
    async (_node: TreeNodeInfo) => {
      const newFsList = await updateFileNodeState(_node, fsNodes);
      setObj(newFsList);
    },
    [fsNodes, setObj],
  );
  const handleNodeCollapse = React.useCallback(
    async (_node: TreeNodeInfo, nodePath: number[]) => {
      const newFsList = await updateCollapseFileNodeState(
        _node,
        fsNodes,
        nodePath,
      );
      console.log(nodePath);
      setObj(newFsList);
    },
    [fsNodes, setObj],
  );
  return {
    obj: fsNodes,
    readRootDirectory,
    treeData,
    handleNodeClick,
    handleNodeExpand,
    handleNodeCollapse,
  };
}
