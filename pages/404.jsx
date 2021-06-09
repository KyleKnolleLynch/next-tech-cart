import Meta from '../components/Meta'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])

  return (
    <>
      <Meta
        title='404'
        robots='robots'
        robotsContent='follow, noarchive, noindex'
      />
      <div className='not-found'>
        <h1>404</h1>
        <h2>Ooops! That page cannot be found</h2>
        <p>
          You will be automatically redirected to the{' '}
          <Link href='/'>Homepage</Link> in 4 seconds
        </p>
      </div>
    </>
  )
}

export default NotFound
