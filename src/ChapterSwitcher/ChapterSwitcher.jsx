import React, { useState, useEffect } from 'react';
import styles from './ChapterSwitcher.module.scss';
import { useSelector } from 'react-redux';
import LangSwitch from '../langagueSwitch/langSwitch';

const ChapterSwitcher = ({ chapter, setChapter }) => {
  const text = useSelector((state) => state.langReducer);
  const view = useSelector((state) => state.app.mobileView);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');

  // Массив для формирования списка глав
  const chapterTitles = Object.keys(text)
    .filter((key) => key.includes('chapter_title_')) // Фильтруем только заголовки глав
    .map((key) => ({ key, title: text[key] })); // Формируем массив {key, title}

  // Извлекаем название текущей главы
  useEffect(() => {
    const titleKey = `chapter_title_${chapter.replace('chapter', '')}`;
    setCurrentTitle(text[titleKey] || ''); // Устанавливаем название текущей главы
  }, [chapter, text]);

  const handleChapterClick = (key) => {
    const chapterKey = `chapter${key.replace('chapter_title_', '')}`;
    setChapter(chapterKey); // Устанавливаем новую главу
    if (view) setIsExpanded(false); // Сворачиваем список в мобильной версии
  };
  function chapterRunner(){
    return(
      <div className={styles.chapterList}>
      {chapterTitles.map(({ key, title }) => (
        <div
          key={key}
          className={`${styles.chapterItem} ${
            `chapter${key.replace('chapter_title_', '')}` === chapter ? styles.active : ''
          }`}
          onClick={() => handleChapterClick(key)} // Устанавливаем выбранную главу
        >
          {title}
        </div>
      ))}
    </div>
    )
  }

  return (
    <div className={styles.chapterSwitcher}>
      {view ? (
        <>
          {/* Мобильная версия */}
          <div
            className={styles.mobileHeading}
          >
            <div
              className={styles.mobileHeader}
              onClick={() => setIsExpanded(!isExpanded)}
            >{currentTitle}</div>
            <LangSwitch mobileView={view}/>
          </div>
          {isExpanded && (
            chapterRunner()
          )}
        </>
      ) : (
        chapterRunner()
      )}
    </div>
  );
};

export default ChapterSwitcher;
