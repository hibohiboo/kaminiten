import { TreeNodeInfo } from '@blueprintjs/core';
import {
  getDirectoryHandle,
  getRootDirectoryHandle,
  readDirectory,
} from '../fileSystem';
import { FileNodeState } from '../fileSystem/types';

const updateState = async (
  item: FileNodeState,
  target: string, // slash区切りのpath ex) dir1/dir2/file1
): Promise<FileNodeState> => {
  // IDが一致したら更新処理を行う
  if (item.id === target) {
    const rootHandle = await getRootDirectoryHandle();
    const handle = await getDirectoryHandle(rootHandle, item.id);
    const children = await readDirectory(handle, item.id);
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

  // 子供がいる場合は再帰的に更新
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
  const newFsList = await Promise.all(
    fsNodes.map((item) => updateState(item, _node.id as string)),
  );
  return newFsList;
};
