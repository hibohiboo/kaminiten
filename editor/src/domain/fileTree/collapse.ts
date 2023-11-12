import { cloneDeep } from 'lodash';
import { FileNodeState } from '../fileSystem/types';

/**
 * ノードを閉じる
 *
 * @param fsNodes  ファイルツリーの状態
 * @param nodePath 閉じるノードのパス [0, 1, 2] なら fsNodes[0].children[1].children[2] が閉じる
 * @returns
 */
export const updateCollapseFileNodeState = async (
  fsNodes: FileNodeState[],
  nodePath: number[],
) => {
  const newState = cloneDeep(fsNodes);

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
