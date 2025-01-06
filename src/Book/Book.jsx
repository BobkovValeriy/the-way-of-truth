import styles from './Book.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Page from "../Page/Page";
import { useEffect, useState } from 'react';
import ChapterSwitcher from '../ChapterSwitcher/ChapterSwitcher';
import {setView} from '../store';

function Book() {
    const text = useSelector((state) => state.langReducer);
    const licenseText = text.licenseText
    const licenseLink = text.licenseLink
    const dispatch = useDispatch()
    const [chapter, setChapter] = useState('chapter1');
    const [chapterText, setChapterText] = useState('');
    const [background, setBackground] = useState('');

    // Проверка и установка данных
    useEffect(() => {
        if (text && text[chapter]) {
            setChapterText(text[chapter]); // Устанавливаем текст главы
            setBackground(getBackgroundImage(chapter));  // Устанавливаем фон
        } else {
            setChapterText(''); // Если данных нет, устанавливаем пустую строку
        }
    }, [chapter, text]);

    const getBackgroundImage = (chapter) => {
        return `/BackGroundImages/${chapter}.png`;
    };
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1010px)");
    
        const handleMediaQueryChange = (e) => {
          if (e.matches) {
            dispatch(setView(true));
          } else {
            dispatch(setView(false));
          }
        };
    
        // Устанавливаем обработчик изменения размера экрана
        mediaQuery.addListener(handleMediaQueryChange);
    
        // Вызываем функцию для начальной настройки
        handleMediaQueryChange(mediaQuery);
    
        // Очищаем обработчик при размонтировании компонента
        return () => mediaQuery.removeListener(handleMediaQueryChange);
      }, []);

    return (
        <div className={styles.book}>
            <ChapterSwitcher chapter={chapter} setChapter={setChapter}/>
            <Page text={chapterText}
            background={background}
            licenseText={licenseText}
            licenseLink={licenseLink}
            />
        </div>
    );
}

export default Book;
