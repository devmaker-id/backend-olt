import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div
      style={{
        padding: '40px',
        textAlign: 'center'
      }}
    >
      <h1>404</h1>

      <h2>
        Halaman Tidak Ditemukan
      </h2>

      <p>
        URL yang Anda akses tidak tersedia.
      </p>

      <Link to="/">
        Kembali
      </Link>
    </div>
  )
}