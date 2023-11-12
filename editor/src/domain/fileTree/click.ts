import { FileNodeState } from '../fileSystem/types';

export const updateClickFileNodeState = async (
  path: string,
  fsNodes: FileNodeState[],
) => {
  console.log(path, fsNodes);
  return fsNodes;
};
