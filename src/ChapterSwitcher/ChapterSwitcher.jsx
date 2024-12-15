import React from 'react';
import styles from './ChapterSwitcher.module.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


const ChapterSwitcher = ({chapter, setChapter }) => {
    const text = useSelector((state) => state.langReducer);
    const view = useSelector((state)=>state.mobileView);
    const [visibleTitles, setVisibleTitles] = useState([]);
  // Массив для формирования списка глав
  const chapterTitles = Object.keys(text)
  .filter((key) => key.includes('chapter_title')) // Оставляем только ключи с 'chapter_title'
  .map((key) => text[key]);

  return (
    <div className={styles.chapterSwitcher}>
      {chapterTitles.map((title, index) => (
        <div
          key={index}
          className={styles.chapterItem}
          onClick={() => setChapter(`chapter`+(index + 1))}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default ChapterSwitcher;