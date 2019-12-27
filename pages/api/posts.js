// import micro from 'micro'
import Cors from 'micro-cors'

const cors = Cors({
    allowedMethods: ['GET', 'HEAD'],
})
const posts = [
    {
        title: 'Next.js is awesome',
    },
    {
        title: 'API support is really great',
    },
]

export default cors((req, res) => {
    // res.setHeader('Content-Type', 'application/json')
    // res.statusCode = 200
    // res.end(JSON.stringify(posts))
    res.status(200).json(posts)
})
