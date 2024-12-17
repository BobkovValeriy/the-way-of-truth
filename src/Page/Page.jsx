import styles from "./Page.module.scss";

const Page = ({ text, background }) => {

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default Page;
