import { useState, useEffect } from 'react'
import Meta from '../components/Meta'
import Products from '../components/Products'
import { commerce } from '../lib/commerce'
import Image from 'next/image'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css"

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
  const [galleryItems, setGalleryItems] = useState([])

  const populateGallery = () => {
    const imgs = [
      <Image src={products[0].media.source} alt='featured motherboard' width='400' height='400' objectFit='cover' placeholder='blur' quality='100' priority />,

      <Image src={products[1].media.source} alt='featured motherboard' width='400' height='400' objectFit='cover' placeholder='blur' quality='100' />,

      <Image src={products[6].media.source} alt='featured motherboard' width='400' height='400' objectFit='cover' placeholder='blur' quality='100' />,

      <Image src={products[7].media.source} alt='featured motherboard' width='400' height='400' objectFit='cover' placeholder='blur' quality='100' />,

    ]
    setGalleryItems(imgs)
  }

  const responsive = {
    0: { items: 1 },
    1024: { items: 2 }
  }

  useEffect(() => {
    populateGallery()
  }, [])



  return (
    <>
      <Meta title='Tech Cart | Home' desc='Mock motherboard shopping cart' keywords='motherboards tech' />

      <main className='pt-20'>
        <section className='-mt-32 py-12 md:py-24 lg:py-52 bg-gradient-to-tr from-indigo-900 to-purple-400 transform -skew-y-6'>
          <div className='pt-32 pb-10 lg:pt-32 lg:pb-12 text-center transform skew-y-6'>
            <h1 className='text-white text-3xl font-medium md:text-6xl lg:text-7xl'>Shop Our Motherboards</h1>
          </div>
          <div className='w-16 h-4 bg-green-300 opacity-50 absolute right-16 -bottom-2 md:w-28 md:h-6 md:-bottom-4 lg:w-40 lg:h-8 lg:-bottom-6'></div>
          <div className='w-10 h-4 bg-blue-300 opacity-50 absolute right-9 -bottom-5 md:w-16 md:h-6 md:-bottom-8 lg:w-24 lg:h-8 lg:-bottom-12'></div>
        </section>

        <section className='my-36 mx-auto'>
          <AliceCarousel items={galleryItems} responsive={responsive} autoPlay autoPlayInterval='3000' infinite innerWidth='700' />
        </section>

        <section>
          <Products products={products} />
        </section>
      </main>
    </>
  )
}
