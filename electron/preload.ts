import { contextBridge, ipcRenderer } from 'electron';

const IPC = {
  send: (data: any) => {
    ipcRenderer.send('message', data);
  },
};

contextBridge.exposeInMainWorld('IPC', IPC);

export default IPC;
