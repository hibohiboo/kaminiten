interface FileSystemDirectoryHandle {
  values(): AsyncIterableIterator<FileSystemFileHandle>;
}
declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}
let rootHandle: FileSystemDirectoryHandle;
export async function getRootDirectoryHandle() {
  if (rootHandle) return rootHandle;
  try {
    rootHandle = await window.showDirectoryPicker();
    if (!rootHandle) return null;
    return rootHandle;
  } catch (e) {
    console.log(e);
    return null;
  }
}
export const readDirectory = async (
  handle: FileSystemDirectoryHandle | null,
) => {
  if (!handle) return [];
  const files = await handle.values();
  const ret: { name: string; kind: string }[] = [];
  for await (const file of files) {
    ret.push({ name: file.name, kind: file.kind });
  }
  return ret;
};
export const readFiles = async (
  fileHandlers: AsyncIterableIterator<FileSystemFileHandle>,
) => {
  const ret: { [key: string]: string } = {};
  for await (const fileHandler of fileHandlers) {
    const file = await fileHandler.getFile();
    ret[file.name] = await file.text();
  }
  return ret;
};
