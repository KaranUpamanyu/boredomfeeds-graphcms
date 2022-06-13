import Link from "next/link";
import styles from '../styles/BlogCard.module.css'
import Image from 'next/image'

function BlogPost({title, author, coverPhoto, content, datePublished, slug}) {
  return (
    <div className={styles.card}>
      <Link href={`/posts/${slug}`}>
        <div className={styles.imgContainer}>
          <Image layout="fill" loader={() => coverPhoto.url} src={coverPhoto.url} alt="" />
        </div>
      </Link>

      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.author}>
          <img src={author.avatar.url} alt={author.username} />
          <h3>{author.username}</h3>
        </div>
        {/* <div className={styles.date}> */}
            {/* <h3>{moment(datePublished).format("MMMM d, YYYY")}</h3> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default BlogPost;
