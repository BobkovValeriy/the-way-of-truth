import styles from "./Page.module.scss";

const Page = ({ text, background, licenseText, licenseLink }) => {
  return (
      <div
        className={styles.page}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Добавляем полупрозрачную плашку для улучшения контраста */}
        <div className={styles.overlay}></div>

        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className={styles.content}
        />
        <div className={styles.license}>
          {licenseText}
          <a
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {licenseLink}
          </a>.
        </div>
      </div>
  );
};

export default Page;
