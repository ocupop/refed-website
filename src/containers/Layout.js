import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import HEAD from '../common/ui/Head'
import Header from '../common/ui/Header'
import Footer from '../common/ui/Footer'
import 'bootstrap.native/dist/bootstrap-native-v4.min';
import 'bootstrap.native/dist/polyfill.min'; // not sure if this is necessary? 
function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    BSN.initCallback(); // BSN is the global namespace for bootstrap native. This initializes bootstrap.native javascript after the DOM loads.
  });

  return (
    <>
      <HEAD />
      {/* {props.location.pathname === '/' ? '' : ''} */}
      <Header siteTitle={data.site.siteMetadata.title} />

      <main id="pageContent">{children}</main>

      <Footer siteTitle={data.site.siteMetadata.title} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
