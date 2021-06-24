import Meta from '../components/Meta'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
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
    <div className='min-h-screen flex flex-col'>
      <Meta
        title='404'
        robots='robots'
        robotsContent='follow, noarchive, noindex'
      />
      <Banner />
      <main className='my-auto px-4 pt-10 sm:mx-auto xl:pt-28 z-50'>
        <h1 className='text-7xl lg:text-9xl font-medium'>404</h1>
        <h2 className='text-2xl mt-4'>Ooops! That page cannot be found</h2>
        <p className='text-lg mt-2'>
          You will be automatically redirected to the{' '}
          <Link href='/'><a className='text-xl font-medium text-purple-500'>Homepage</a></Link> in 4 seconds
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
