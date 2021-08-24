import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Layout from '../layout/layout'
import Menu from '../components/menu'
import siteConfig from '../../gatsby-config'
import NoteList from '../components/note-list'
import Search from '../components/search'

export default function Home() {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      homeNote: mdx(fields: { slug: { eq: "/home" } }) {
        html
        fields {
          title
          date
        }
        frontmatter {
          tags
        }
      }
      notes: allMdx(limit: 5, sort: { fields: fields___date, order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
              title
              date
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  return data.homeNote ? (
    <Layout title={data.homeNote.fields.title} type="home">
      <div className="note-area">
        <h1 className="note-title">{data.homeNote.fields.title}</h1>
        <div
          className="note-content"
          dangerouslySetInnerHTML={{ __html: data.homeNote.html }}
        ></div>
      </div>
    </Layout>
  ) : (
    <Layout title="Home" type="home">
      <div className="block">
        <h1>{siteConfig.siteMetadata.title}</h1>
        <p className="lead">{siteConfig.siteMetadata.description}</p>
      </div>

      <div className="block">
        <h3>Table Of Contents</h3>
        <Menu />
      </div>

      <div className="block">
        <Search size="medium" showExcerpt={true} />
      </div>

      <div className="block">
        <h3>Latest Notes</h3>
        <NoteList notes={data.notes.edges} />
      </div>

      <br />
      <Link to="/sitemap">See All Notes</Link>
    </Layout>
  )
}
