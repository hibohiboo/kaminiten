import { TreeNodeInfo } from '@blueprintjs/core';
import { FileNodeState } from './types';
import { getDirectoryHandle, getRootDirectoryHandle, readDirectory } from '.';

const updateState = async (
  item: FileNodeState,
  target: string,
): Promise<FileNodeState> => {
  if (item.id === target) {
    const rootHandle = await getRootDirectoryHandle();
    const handle = await getDirectoryHandle(rootHandle, item.id);
    const children = await readDirectory(handle, item.name);
    return {
      ...item,
      isExpanded: true,
      children: children.map((child) => ({
        ...child,
        isExpanded: false,
        id: `${child.dirPath}/${child.name}`,
      })),
    };
  }
  if (item.children) {
    return {
      ...item,
      children: await Promise.all(
        item.children.map((child) => updateState(child, target)),
      ),
    };
  }
  return item;
};

export const updateFileNodeState = async (
  _node: TreeNodeInfo,
  fsNodes: FileNodeState[],
) => {
  console.log('updateFileNodeState', _node.id);
  const newFsList = await Promise.all(
    fsNodes.map((item) => updateState(item, _node.id as string)),
  );
  return newFsList;
};
