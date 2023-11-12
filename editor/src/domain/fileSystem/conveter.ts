import { TreeNodeInfo } from '@blueprintjs/core';
import { FileNodeState } from './types';

export const fileNodeStateToTreeNodeInfo = (
  state: FileNodeState,
): TreeNodeInfo<FileNodeState> => {
  return {
    id: state.id,
    hasCaret: state.kind === 'directory',
    icon: getIcon(state.kind, state.isExpanded),
    label: state.name,
    isExpanded: state.isExpanded,
    isSelected: state.isSelected,
    nodeData: state,
    childNodes: state.children?.map(fileNodeStateToTreeNodeInfo),
  };
};

function getIcon(kind: string, isExpanded: boolean) {
  if (kind === 'directory') {
    return isExpanded ? 'folder-open' : 'folder-close';
  }
  return 'document';
}
