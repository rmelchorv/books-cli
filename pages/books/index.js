import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`)

  //La función getStaticProps se ejecuta en el servidor
  //console.log(res)

  const data = await res.json()

  //console.log(data)
  return {
    props: {
      books: data
    }
  }
}
const BookList = ({ books }) => {
  async function handleDelete(e, bid) {
    e.preventDefault()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${bid}`, {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
      body: JSON.stringify({
          _method: 'DELETE'
        })
    })
    if (res.ok) {
      window.location.href='/books'
    }
  }
  return (
    <div className={styles.container}>
      <h1>BooksList</h1>
      <ul data-cy="book-list">{
        books.map(book => (
          <li key={`book-${book.id}`}>
            <Link href={`/books/${book.id}`} data-cy={`link-to-visit-book-${book.id}`}>
              {book.title}
            </Link>
            {' - '}
            <Link href={`/books/${book.id}/edit`} data-cy={`link-to-edit-book-${book.id}`}>
              Edit
            </Link>
            {' - '}
            <form onSubmit={(e) => handleDelete(e, book.id)} style={{display: 'inline'}}>
              <button data-cy={`link-to-delete-book-${book.id}`}>Delete</button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/books/create">BookCreate</Link>
    </div>
  )
}
export default BookList