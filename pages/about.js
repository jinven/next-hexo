function About() {
    return <h1>About Page</h1>
}
About.getInitialProps = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
    return {}
}
export default About
