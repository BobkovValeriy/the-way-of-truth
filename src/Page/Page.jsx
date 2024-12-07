import DOMPurify from 'dompurify';
import styles from "./Page.module.scss";

const Page = ({ text, background }) => {
  const sanitizedContent = DOMPurify.sanitize(text);

  return (
    <div
      className={styles.page}
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default Page;
