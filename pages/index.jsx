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

      <main>
        <h1>Shop Our Motherboards</h1>
        <Products products={products} />
      </main>
    </>
  )
}
