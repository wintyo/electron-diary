import React, { useState } from 'react';
import { hot } from 'react-hot-loader';

import Calender from '../components/Calendar';

console.log(window.IPC);
window.IPC.send('aaa');

const App = () => {
  const [targetMonth, setTargetMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Calender
        targetMonth={targetMonth}
        selectedDate={selectedDate}
        onChangeMonth={setTargetMonth}
        onChangeSelectedDate={setSelectedDate}
      />
    </div>
  );
}

export default hot(module)(App);
