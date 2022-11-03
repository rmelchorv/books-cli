import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState} from 'react'
import styles from '../../styles/Home.module.css'
        
const BookCreate = () => {
  const router = useRouter()
  const [bookTitle, setBookTitle] = useState('')
  const [errors, setErrors] = useState([])
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    //Evita enviar los datos y refrescar la página
    e.preventDefault()
    setSubmitting(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
          },
        body: JSON.stringify({
            title: bookTitle
          })
      })

    //console.log(res)

    //Si la respuesta es correcta...
    if (res.ok) {
      setBookTitle('')
      setErrors([])

      //... se redirecciona al componente BookList
      return router.push('/books');
    }
    //Si no, obtiene los errores de la respuesta
    const data = await res.json()

    setErrors(data.errors)
    setSubmitting(false)
  }
  return (
    <div className={styles.container}>
      <h1>BookCreate</h1>
      <p style={{display: 'none'}}>{JSON.stringify(errors)}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" value={bookTitle} disabled={submitting} /** Evita enviar varias solicitudes */
               onChange={(e) => setBookTitle(e.target.value)} data-cy="input-book-title" />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? 'Sending...' : 'Send' }
        </button>
        { errors.title && ( /** Evalua la expresión de la izquierda, si es valida (verdadera), ejecuta la
                             *  acción (expresión) de la derecha. En caso contrario, no realiza nada.  
                             *  Es decir, si hay errores, los muestra. Si no, no muestra nada. */
          <span style={{color: 'red', display: 'block'}}>
            {errors.title}
          </span>
         )}
      </form>
      <br></br>
      <Link href="/books">BookList</Link>
    </div>
  )
}
export default BookCreate