import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GraphQLClient, gql} from 'graphql-request'
import BlogCard from '../components/BlogCard'

const graphcms = new GraphQLClient('https://api-ap-south-1.graphcms.com/v2/cl4cdx8ko3tcy01wdabv2aahu/master')

let QUERY = gql`
  {
    posts {
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

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);
  return {
    props: {
      posts
    },
    revalidate: 30
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {console.log(posts)}

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            content={post.content.html}
            datePublished={post.date_published}
            slug={post.slug}
            // key={post.id} {...post}
          />
        ))}
      </main>
    </div>
  );
}
