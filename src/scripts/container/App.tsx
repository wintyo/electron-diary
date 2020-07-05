import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

import styles from './css/App.scss';

import Calender from '../components/Calendar';
import ReactMarkdown from 'react-markdown';

console.log(window.IPC);
window.IPC.send('aaa');

const App = () => {
  const [targetMonth, setTargetMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markdownText, setMarkdownText] = useState('');

  return (
    <div className={styles.root}>
      <div className={styles.root__side}>
        <Calender
          targetMonth={targetMonth}
          selectedDate={selectedDate}
          onChangeMonth={setTargetMonth}
          onChangeSelectedDate={setSelectedDate}
        />
      </div>
      <div className={styles.root__editor}>
        <textarea
          className={styles.textarea}
          value={markdownText}
          onChange={(event) => { setMarkdownText(event.currentTarget.value); }}
        />
      </div>
      <div className={styles.root__preview}>
        <ReactMarkdown
          className={styles.preview}
          source={markdownText}
        />
      </div>
    </div>
  );
}

export default hot(module)(App);
