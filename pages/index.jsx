import Meta from '../components/Meta'
import Products from '../components/Products'
import { commerce } from '../lib/commerce'

export const getStaticProps = async () => {
  const { data: products } = await commerce.products.list()

  return {
    props: {
      products,
      revalidate: 1,
    }
  }
}

export default function Home({ products }) {
  return (
    <>
      <Meta title='Tech Cart | Home' desc='Mock motherboard shopping cart' keywords='motherboards tech' />

      <main className='pt-20'>
        <div className='w-5/6 h-48 mx-auto bg-gradient-to-r from-indigo-900 to-blue-200 transform -skew-x-12 relative sm:h-96 -translate-y-1/5'> </div>
        <h1 className='absolute top-28 left-20 text-white text-4xl font-medium md:text-6xl md:top-48'>Shop Our Motherboards</h1>
        <Products products={products} />
      </main>
    </>
  )
}
