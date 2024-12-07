import styles from './Book.module.scss';
import { useSelector } from 'react-redux';
import Page from "../Page/Page";
import { useEffect, useState } from 'react';
import ChapterSwitcher from '../ChapterSwitcher/ChapterSwitcher';

function Book() {
    const text = useSelector((state) => state.langReducer);
    const [chapter, setChapter] = useState('chapter1');
    const [chapterText, setChapterText] = useState('');
    const [background, setBackground] = useState('');

    // Проверка и установка данных
    useEffect(() => {
        if (text && text[chapter]) {
            setChapterText(text[chapter]); // Устанавливаем текст главы
        } else {
            setChapterText(''); // Если данных нет, устанавливаем пустую строку
        }
        setBackground(getBackgroundImage(chapter)); // Устанавливаем фон
    }, [chapter, text]);

    const getBackgroundImage = (chapter) => {
        return `/BackGroundImages/${chapter}.png`;
    };

    return (
        <div className={styles.book}>
            <ChapterSwitcher setChapter={setChapter}/>
            <Page text={chapterText} background={background} />
        </div>
    );
}

export default Book;
