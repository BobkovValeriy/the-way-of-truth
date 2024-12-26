import styles from "./Page.module.scss";

const Page = ({ text, background }) => {
  return (
    <div
      className={styles.page}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: text }}
        className={styles.content}
      />
      <div className={styles.license}>
        Copyright © 2024 Valeriy Vladimirovich Bobkov<br />
        This work is licensed under a{" "}
        <a
          href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
          International License
        </a>.
      </div>
    </div>
  );
};

export default Page;
