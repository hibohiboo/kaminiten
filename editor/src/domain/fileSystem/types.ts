export interface FileNodeInfo {
  name: string;
  kind: string;
  dirPath: string;
  children?: FileNodeInfo[];
}
