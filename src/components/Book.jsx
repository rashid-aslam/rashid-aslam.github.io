import { useEffect, createRef } from "react";
import PropTypes from "prop-types";
import fetchImage from "../utils/cover";
import getOlid from "../utils/olid";

const Book = ({ title, author_name, publish_date: publishedAt, editions }) => {
  const coverRef = createRef();
  const olid = getOlid(editions?.docs?.[0]?.key);

  useEffect(() => {
    async function loadCover() {
      const img = await fetchImage(
        `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`
      );

      img.alt = `Cover image for book ${title}`;
      if (coverRef.current.hasChildNodes()) {
        coverRef.current.removeChild(coverRef.current.firstChild);
      }
      coverRef.current.appendChild(img);
    }

    if (olid)
      loadCover();
  }, [title, olid, coverRef]);

  return (
    <div className="book">
      <div className="cover" ref={coverRef}></div>
      <h3>{title}</h3>
      <div className="author">Author: {author_name?.[0]}</div>
      <div className="publish-date">Publish Date: {publishedAt?.[0]}</div>
    </div>
  );
};

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author_name: PropTypes.arrayOf(PropTypes.string).isRequired,
  editions: PropTypes.shape({
    docs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
  }),
  publish_date: PropTypes.arrayOf(PropTypes.string),
};

export default Book;
