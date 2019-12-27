import Router from 'next/router'

const handler = () => {
    Router.push({
        pathname: '/about',
        query: { name: 'Zeit' },
    })
}

function ReadMore() {
    return (
        <div>
            Click <span onClick={handler}>here</span> to read more
            <style jsx>{`
                span {
                    color: #28f;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}

export default ReadMore
