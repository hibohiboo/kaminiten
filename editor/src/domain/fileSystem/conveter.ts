import { TreeNodeInfo } from '@blueprintjs/core';
import { FileNodeState } from './types';

export const fileNodeStateToTreeNodeInfo = (
  state: FileNodeState,
): TreeNodeInfo => {
  return {
    id: state.id,
    hasCaret: state.kind === 'directory',
    icon: state.kind === 'directory' ? 'folder-close' : 'document',
    label: state.name,
    isExpanded: state.isExpanded,
    childNodes: state.children?.map(fileNodeStateToTreeNodeInfo),
  };
};
