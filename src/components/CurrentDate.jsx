import React, { useState, useEffect } from 'react';


export default function CurrentDate() {
  const [today, setToday] = useState('');

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    setToday(`${year}-${month}-${day}`);
  }, []);

  return <div>오늘의 날짜: {today}</div>;
}

