import { type TreeNodeInfo } from '@blueprintjs/core';
import { fileNodeStateToTreeNodeInfo } from '@kaminiten-editor/domain/fileSystem/conveter';
import { atom, useAtom } from 'jotai';
import React from 'react';
import {
  getDirectoryHandle,
  getRootDirectoryHandle,
  readDirectory,
} from '../domain/fileSystem';
import type { FileNodeState } from '../domain/fileSystem/types';

const fsNodeAtom = atom<FileNodeState[]>([]);
export function useFileSystem() {
  console.log('read');
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
    async (_node: TreeNodeInfo, nodePath: number[]) => {
      const newFsList = await Promise.all(
        fsNodes.map(async (item) => {
          if (item.name === _node.label) {
            const rootHandle = await getRootDirectoryHandle();
            const handle = await getDirectoryHandle(rootHandle, item.name);
            const children = await readDirectory(handle, item.name);
            return {
              ...item,
              isExpanded: true,
              children: children.map((child) => ({
                ...child,
                isExpanded: false,
                id: child.name,
              })),
            };
          }
          return item;
        }),
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
  };
}
