import Link from 'next/link'
import styles from '../../../styles/Home.module.css'

export async function getStaticProps({ params }) {        //context) {
  //console.log(context)
  //console.log(context.params.bid)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.bid}`)
  const data = await res.json()

  return {
    props: {
      book: data
    }
  }
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`)
  const data = await res.json()

  return {
    paths: //[{ params: {bid: 1} }, { params: {bid: 2} } ... { params: {bid: n} }]
      data.map(book => ({
        params: { bid: book.id.toString() }
      })),
    fallback: false
  }
}
const BookDetail = ({ book }) => {

  return (
    <div className={styles.container}>
      <h1>{book.title}</h1>
      <Link href="/books">BookList</Link>
    </div>
  )
}
export default BookDetail