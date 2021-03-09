const path = require(`path`)
const _ = require("lodash")
const makeSlug = require("./src/utils/make-slug")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
  	const { createNodeField } = actions
    const title = node.frontmatter.title ? node.frontmatter.title : createFilePath({ node, getNode, basePath: `_notes` }).replace(/^\/(.+)\/$/, '$1')
    const slug = node.frontmatter.slug ? makeSlug(node.frontmatter.slug) : makeSlug(title)
    const fileNode = getNode(node.parent)
    const date = node.frontmatter.date ? node.frontmatter.date : fileNode.ctime

    createNodeField({
      node,
      name: `slug`,
      value: `/${slug}`
    })
    createNodeField({
      node,
      name: `date`,
      value: date
    })
    createNodeField({
      node,
      name: `title`,
      value: title.replace(/\//g,'')
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              title
            }
            frontmatter {
              title
              tags
              date
              aliases
            }
            rawMarkdownBody
            excerpt
            fileAbsolutePath
          }
        }
      }
      tags: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  let referenceMap = {}
  let backLinkMap = {}

  // I didn't used the much more cleaner foreach because the `referenceMap` was not working well with that.
  for(let i = 0; i < result.data.allMarkdownRemark.edges.length; i++) {
    const node = result.data.allMarkdownRemark.edges[i].node
    const title = node.frontmatter.title ? node.frontmatter.title : node.fields.title

    // Go thru all the notes, create a map of how references map.
    const refersNotes = findReferences( node.rawMarkdownBody )
    referenceMap[title] = refersNotes

    for(let j = 0; j < refersNotes.length; j++) {
      const tle = refersNotes[j]

      if(backLinkMap[tle] === undefined) backLinkMap[tle] = [ title ]
      else backLinkMap[tle].push(title)
    }
  }

  for(let i = 0; i < result.data.allMarkdownRemark.edges.length; i++) {
    const node = result.data.allMarkdownRemark.edges[i].node
    const title = node.frontmatter.title ? node.frontmatter.title : node.fields.title
    const aliases = node.frontmatter.aliases ? node.frontmatter.aliases : []

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/note.jsx`),
      context: {
        title: title,
        slug: node.fields.slug,
        refersTo: referenceMap[title],
        referredBy: backLinkMap[title]
      }
    })

    // Handling Aliases
    for(let j = 0; j < aliases.length; j++) {
      createRedirect({
        fromPath: `/${makeSlug(aliases[j])}`,
        toPath: node.fields.slug,
        redirectInBrowser: true,
        isPermanent: true,
      })
    }
  }

  result.data.tags.group.forEach(( tag ) => {
    createPage({
      path: `/tags/${makeSlug(tag.fieldValue)}`,
      component: path.resolve(`./src/templates/tag.jsx`),
      context: {
        tag: tag.fieldValue
      },
    })
  })

  createPage({
    path: `/tags`,
    component: path.resolve(`./src/templates/tag-list.jsx`)
  })
}

// exports.sourceNodes = require("./src/source-nodes");

function findReferences( content ) {
  // Handles both [[Note Title]] and [[Note Title|text to show]] formats
  const link_regex = /\[\[([^\]\|]+)(\|.+)?\]\]/g;
  let links = [...content.matchAll(link_regex)]

  const matched_notes = links.map( lnk => lnk[1] )

  // :TODO: Send a bit of text around the link back as well. Can be used in back links for context.

  return matched_notes
}