export interface FileNodeInfo {
  name: string;
  kind: string;
  dirPath: string;
}
export interface FileNodeState extends FileNodeInfo {
  isExpanded: boolean;
  id: string;
  children?: FileNodeState[];
}
