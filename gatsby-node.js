const path = require(`path`)

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(context, request, callback) {
        const regex = /^@?firebase(\/(.+))?/
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, `umd ${request}`)
        }
        callback()
      })
    })
  }
}

// ------------------------
// CREATE PAGES
// ------------------------
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  await graphql(`
    query {
      allPages {
        edges {
          node {
            id
            pageUrl
            layout
          }
        }
      }
      allPosts {
        edges {
          node {
            id
            url
            layout
          }
        }
      }
    }
  `).then(
    ({
      data: {
        allPages: { edges: pages },
        allPosts: { edges: posts }
      }
    }) => {
      const collections = [...posts]

      // Build Web Pages
      pages.forEach(({ node: { layout, pageUrl, id } }) => {
        const component = path.resolve(`./src/templates/${layout}.jsx`)

        createPage({
          component,
          path: pageUrl,
          context: {
            id
          }
        })
      })

      // Build Collection Pages
      collections.forEach(({ node: { layout, url, id } }) => {
        const component = path.resolve(`./src/templates/${layout}.jsx`)

        createPage({
          component,
          path: url,
          context: {
            id
          }
        })
      })
    }
  )
}
