import React, { useState, useEffect } from 'react';
import styles from './ChapterSwitcher.module.scss';
import { useSelector } from 'react-redux';

const ChapterSwitcher = ({ chapter, setChapter }) => {
  const text = useSelector((state) => state.langReducer);
  const view = useSelector((state) => state.mobileView);
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

  useEffect(()=>{
    console.log(isExpanded)
    console.log(currentTitle)
  },[isExpanded])

  return (
    <div className={styles.chapterSwitcher}>
      {view ? (
        <>
          {/* Мобильная версия */}
          <div
            className={styles.chapterItem}
            onClick={() => setIsExpanded(!isExpanded)} // Переключение между раскрытым и свернутым состоянием
          >
            {currentTitle} {/* Отображение текущей главы */}
          </div>
          {isExpanded && (
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
          )}
        </>
      ) : (
        // Десктопная версия
        <div className={styles.chapterList}>
          {chapterTitles.map(({ key, title }) => (
            <div
              key={key}
              className={`${styles.chapterItem} ${
                `chapter${key.replace('chapter_title_', '')}` === chapter ? styles.active : ''
              }`}
              onClick={() => handleChapterClick(key)}
            >
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChapterSwitcher;
