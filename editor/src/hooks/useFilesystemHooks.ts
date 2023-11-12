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

  const handleNodeExpand = React.useCallback(
    async (node: TreeNodeInfo) => {
      const newFsList = await updateFileNodeState(node, fsNodes);
      setObj(newFsList);
    },
    [fsNodes, setObj],
  );
  const handleNodeCollapse = React.useCallback(
    async (_node: TreeNodeInfo, nodePath: number[]) => {
      const newFsList = await updateCollapseFileNodeState(fsNodes, nodePath);
      setObj(newFsList);
    },
    [fsNodes, setObj],
  );
  const handleNodeClick = React.useCallback(
    async (
      node: TreeNodeInfo<FileNodeState>,
      nodePath: number[],
      e: React.MouseEvent<HTMLElement>,
    ) => {
      if (node.nodeData?.kind === 'directory') {
        if (node.isExpanded) {
          await handleNodeCollapse(node, nodePath);
        } else {
          await handleNodeExpand(node);
        }
      }
      if (node.nodeData?.kind === 'file') {
        console.log('file');
        console.log(e);
      }
    },
    [handleNodeCollapse, handleNodeExpand],
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
