import React, { useState, useEffect } from 'react';
import styles from "./langSwitch.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { textTranslate } from "./langReducer";
import { getCountryCode } from '../engine';
import RU from "./lang/ru96.png";
import EN from "./lang/en96.png";
import UA from "./lang/ua96.png";
import FR from "./lang/fra96.png"
import DE from "./lang/ger96.png"

const LangSwitch = ({ mobileView = false }) => {
  const lang = useSelector((state) => state.langReducer.langague);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const [showAllLang, setShowAllLang] = useState(false);

  function showAll(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowAllLang(!showAllLang);
  }

  function choseLang(e, lan) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(textTranslate(lan));
    setShowAllLang(false);
  }

  const langagueArr = [
    { code: "EN", src: EN },
    { code: "DE", src: DE },
    { code: "UA", src: UA },
    { code: "FR", src: FR },
    { code: "RU", src: RU },
  ];

  const visibleLangs = langagueArr.filter(
    (l) => !(l.code === "RU" && lang === "UA")
  );

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prevIndex) => (prevIndex + 1) % visibleLangs.length);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prevIndex) =>
      prevIndex === 0 ? visibleLangs.length - 1 : prevIndex - 1
    );
  };

  const getDisplayedLangs = () => {
    if (mobileView) {
      return [visibleLangs[index]];
    }
    if (showAllLang) {
      return visibleLangs;
    }
    const firstLang = visibleLangs[index];
    const secondLang = visibleLangs[(index + 1) % visibleLangs.length];
    const thirdLang = visibleLangs[(index + 2) % visibleLangs.length];
    return [firstLang, secondLang, thirdLang];
  };

  const displayedLangs = getDisplayedLangs();

  useEffect(() => {
    async function fetchCountryCode() {
      const countryCode = await getCountryCode();
      dispatch(textTranslate(countryCode));
    }

    fetchCountryCode();
  }, [dispatch]);

  return (
    <div
      className={`${styles.langague_switcher} ${
        showAllLang ? styles.expanded : ""
      } ${mobileView ? styles.mobile : ""}`}
      onClick={(e) => !mobileView && showAll(e)}
    >
      {!showAllLang && (
        <div
          onClick={(e) => handlePrev(e)}
          className={styles.lang_button}
        >
          ←
        </div>
      )}
      {displayedLangs.map((lan) => (
        <div key={lan.code} className={styles.langague}>
          <img
            src={lan.src}
            alt={lan.code}
            className={styles.langague_img}
            onClick={(e) => choseLang(e, lan.code)}
            draggable="false"
          />
        </div>
      ))}
      {!showAllLang && (
        <div
          onClick={(e) => handleNext(e)}
          className={styles.lang_button}
        >
          →
        </div>
      )}
    </div>
  );
};


export default LangSwitch;