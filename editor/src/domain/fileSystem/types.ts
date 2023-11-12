export interface FileNodeInfo {
  name: string;
  kind: string;
  dirPath: string;
}
export interface FileNodeState extends FileNodeInfo {
  id: string; // dirPath + name: slash区切りのpath ex) dir1/dir2/file1
  isExpanded: boolean;
  children?: FileNodeState[];
}
