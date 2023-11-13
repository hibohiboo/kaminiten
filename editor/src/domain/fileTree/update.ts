import { cloneDeep } from 'lodash';
import { FileNodeState } from '../fileSystem/types';

export async function updateNodes(
  fsNodes: FileNodeState[],
  nodePath: number[],
  callback: (node: FileNodeState) => void,
) {
  const newState = cloneDeep(fsNodes);
  if (nodePath.length === 0) return newState;

  const firstNode = newState[nodePath[0]];
  if (nodePath.length === 1) {
    callback(firstNode);
  } else {
    updateNode(firstNode, nodePath.slice(1), callback);
  }
  return newState;
}

function updateNode(
  newState: FileNodeState,
  nodePath: number[],
  callback: (node: FileNodeState) => void,
): void {
  let node = newState;
  for (let i = 0; i < nodePath.length; i++) {
    node = node.children![nodePath[i]];
  }
  callback(node);
}
