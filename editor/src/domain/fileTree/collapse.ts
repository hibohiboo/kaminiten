import { TreeNodeInfo } from '@blueprintjs/core';
import { clone } from 'lodash';
import { FileNodeState } from '../fileSystem/types';

export const updateCollapseFileNodeState = async (
  _node: TreeNodeInfo,
  fsNodes: FileNodeState[],
  nodePath: number[],
) => {
  const newState = clone(fsNodes);

  if (nodePath.length === 1) {
    newState[nodePath[0]].isExpanded = false;
  } else {
    collapseNode(newState[nodePath[0]], nodePath.slice(1));
  }
  return newState;
};
function collapseNode(newState: FileNodeState, nodePath: number[]): void {
  let node = newState;
  for (let i = 0; i < nodePath.length; i++) {
    node = node.children![nodePath[i]];
  }
  node.isExpanded = false;
}
