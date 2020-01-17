import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withRouter } from 'next/router'
import css from '../styles/global.scss'

const Home = ({ }) => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <div className="hero">
      <div style={{ textAlign: 'center' }}>
        <ul className={css.html}>
          <li>
            <Link href="/HelloWorld" replace>
              <a>A!=b</a>
            </Link>
          </li>
          <li>
            <Link href="/HiThere">
              <img src="logo.jpg" alt="image" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <style jsx>{`
      a {
        text-decoration: none;
      }
    `}</style>
  </div>
)
Home.getInitialProps = async ({ res }) => {
  return {}
}
export default withRouter(Home)
