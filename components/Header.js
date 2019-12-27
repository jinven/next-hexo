import Link from 'next/link'

export default () => (
    <div>
        <Link href="/">
            <a style={styles.a}>Home</a>
        </Link>

        <Link href="/contact">
            <a style={styles.a}>Contact</a>
        </Link>
    </div>
)

const styles = {
    a: {
        marginRight: 10,
    },
}
