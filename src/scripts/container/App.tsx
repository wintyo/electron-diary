import React from 'react';
import { hot } from 'react-hot-loader';

console.log(window.IPC);
window.IPC.send('aaa');

const App = () => {
  return (
    <div>テスト</div>
  );
}

export default hot(module)(App);
