import React from 'react'
import App from 'next/app'
import Link from 'next/link'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

const theme = {
    colors: {
        primary: '#0070f3',
    },
}
Router.events.on('routeChangeStart', (url) => {
    NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', (err, url) => {
    NProgress.done()
})

export default class MyApp extends App {
    static async getInitialProps(appContext) {
        console.log('_app.js - getInitialProps')
        const appProps = await App.getInitialProps(appContext)
        return { ...appProps }
    }
    componentDidCatch(error, errorInfo) {
        console.log('CUSTOM ERROR HANDLING', error)
        // This is needed to render errors correctly in development / production
        super.componentDidCatch(error, errorInfo)
    }
    render() {
        const { Component, pageProps } = this.props
        return (
            <ThemeProvider theme={theme}>
                <Head>
                    {/* Import CSS for nprogress */}
                    <link rel="stylesheet" type="text/css" href="/nprogress.css" />
                    <link rel="stylesheet" type="text/css" href="https://unpkg.com/firacode@2.0.0/distr/fira_code.css" />
                </Head>
                <nav>
                    <style jsx>{`
                        a {
                            margin: 0 10px 0 0;
                        }
                    `}</style>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                    <Link href="/contact">
                        <a>contact</a>
                    </Link>
                    <a href="/non-existing">Non Existing Page</a>
                </nav>
                <Component {...pageProps} />
            </ThemeProvider>
        )
    }
}
