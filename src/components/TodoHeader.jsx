import { useState, useEffect } from 'react';

export default function TodoHeader() {
  
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    
    const formattedDate = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <h1 className="todo__title">
      No Think, Do It. <span className="todo__date">{currentDate}</span>
    </h1>
  );
}
