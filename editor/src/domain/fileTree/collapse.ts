import { FileNodeState } from '../fileSystem/types';
import { updateNodes } from './update';

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
) =>
  updateNodes(fsNodes, nodePath, (node) => {
    node.isExpanded = false;
  });
