import React, { useState, useEffect, useMemo } from 'react';
import { hot } from 'react-hot-loader';

import { format as formatDate } from 'date-fns';
import { debounce } from 'lodash-es';

import styles from './css/App.scss';

import Calender from '../components/Calendar';
import ReactMarkdown from 'react-markdown';

/**
 * テキストの保存
 * @param targetMonth - 対象月
 * @param textMap - テキストデータ
 */
const saveTextData = debounce((targetMonth: Date, textMap: { [dateStr: string]: string }) => {
  const yearMonthStr = formatDate(targetMonth, 'yyyyMM');
  const updateTextMap = Object.assign(
    {},
    ...Object.keys(textMap)
      .filter((dateStr) => (new RegExp('^' + yearMonthStr).test(dateStr)))
      .map((dateStr) => ({
        [dateStr]: textMap[dateStr],
      }))
  );
  return window.IPC.saveMonthTexts(targetMonth, updateTextMap);
}, 500);

const App = () => {
  const [targetMonth, setTargetMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markdownTextMap, setMarkdownTextMap] = useState<{ [dateStr: string]: string }>({});

  const selectedDateStr = useMemo(() => formatDate(selectedDate, 'yyyyMMdd'), [selectedDate]);

  useEffect(() => {
    window.IPC.loadMonthTexts(targetMonth)
      .then(((loadedTextMap: { [dateStr: string]: string }) => {
        console.log(loadedTextMap);
        setMarkdownTextMap({
          ...markdownTextMap,
          ...loadedTextMap,
        });
      }));
  }, [targetMonth]);

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
          value={markdownTextMap[selectedDateStr] || ''}
          placeholder="今日の内容を記入してください"
          onChange={(event) => {
            const newTextMap = {
              ...markdownTextMap,
              [selectedDateStr]: event.currentTarget.value
            };
            setMarkdownTextMap(newTextMap);
            saveTextData(selectedDate, newTextMap);
          }}
        />
      </div>
      <div className={styles.root__preview}>
        <ReactMarkdown
          className={styles.preview}
          source={markdownTextMap[selectedDateStr]}
        />
      </div>
    </div>
  );
}

export default hot(module)(App);
