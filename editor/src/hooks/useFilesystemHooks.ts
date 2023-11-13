import { type TreeNodeInfo } from '@blueprintjs/core';
import { fileNodeStateToTreeNodeInfo } from '@kaminiten-editor/domain/fileSystem/conveter';
import { updateClickFileNodeState } from '@kaminiten-editor/domain/fileTree/click';
import { updateCollapseFileNodeState } from '@kaminiten-editor/domain/fileTree/collapse';
import { updateFileNodeState } from '@kaminiten-editor/domain/fileTree/expand';
import { textFileAtom } from '@kaminiten-editor/domain/selectFile/fileAtom';
import { atom, useAtom } from 'jotai';
import React from 'react';
import {
  getDirectoryHandle,
  getRootDirectoryHandle,
  readDirectory,
  readFile,
} from '../domain/fileSystem';
import type { FileNodeState } from '../domain/fileSystem/types';

const fsNodeAtom = atom<FileNodeState[]>([]);
export function useFileSystem() {
  const [fsNodes, setObj] = useAtom(fsNodeAtom);
  const [, setFile] = useAtom(textFileAtom);
  const readRootDirectory = async () => {
    const handle = await getRootDirectoryHandle();
    const ls = await readDirectory(handle, '');
    setObj(
      ls.map((item) => ({
        ...item,
        isExpanded: false,
        isSelected: false,
        id: item.name,
      })),
    );
  };
  const treeData: TreeNodeInfo[] = fsNodes.map(fileNodeStateToTreeNodeInfo);

  const handleNodeExpand = React.useCallback(
    async (node: TreeNodeInfo) => {
      const newFsList = await updateFileNodeState(node.id as string, fsNodes);
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
    async (node: TreeNodeInfo, nodePath: number[]) => {
      const data = node.nodeData as FileNodeState;
      if (data.kind === 'file') {
        const newFsList = await updateClickFileNodeState(
          node.id as string,
          fsNodes,
        );
        setObj(newFsList);
        const handle = await getRootDirectoryHandle();
        const dirHandle = await getDirectoryHandle(handle, data.dirPath);
        if (!dirHandle) return;
        const file = await readFile(dirHandle, data.name);
        const text = await file.text();
        setFile(text);
        return;
      }
      if (data.kind !== 'directory') return;
      if (node.isExpanded) {
        await handleNodeCollapse(node, nodePath);
        return;
      }
      await handleNodeExpand(node);
    },
    [fsNodes, handleNodeCollapse, handleNodeExpand, setFile, setObj],
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
