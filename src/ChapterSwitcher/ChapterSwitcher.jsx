import React from 'react';
import styles from './ChapterSwitcher.module.scss';
import { useSelector } from 'react-redux';

const ChapterSwitcher = ({ setChapter }) => {
    const text = useSelector((state) => state.langReducer);
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
          onClick={() => setChapter(`chapter`+(index + 1))} // Передаем индекс главы при клике
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default ChapterSwitcher;