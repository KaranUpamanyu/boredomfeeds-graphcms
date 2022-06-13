import styles from '../../styles/Slug.module.css'
import {GraphQLClient, gql} from 'graphql-request'

const graphcms = new GraphQLClient('https://api-ap-south-1.graphcms.com/v2/cl4cdx8ko3tcy01wdabv2aahu/master')

let QUERY = gql`
  query Post($slug: String!) {
    post (where: {slug: $slug}) {
      id
      title
      date_published
      slug
      content {
        html
      }
      author {
        username
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const {posts} = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({params: {slug: post.slug}})),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, {slug});
  const post = data.post;
  return {
    props: {
      post
    },
    revalidate: 30
  };
}

export default function BlogPost({post}) {
  return(
    <main className={styles.blog}>
      <img
        className={styles.cover}
        src={post.coverPhoto.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <img src={post.author.avatar.url} alt={post.author.username} />
          <div className={styles.authtext}>
            <h6>By {post.author.username}</h6>
            <h6 className={styles.date}>{post.date_published}</h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{__html: post.content.html}}
      ></div>
    </main>
  )
}
