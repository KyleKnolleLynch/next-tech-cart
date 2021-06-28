import { useState, useEffect } from 'react'
import Meta from '../components/Meta'
import Banner from '../components/Banner'
import Products from '../components/Products'
import Footer from '../components/Footer'
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

      <Image src={products[1].media.source} alt='featured motherboard' width='400' height='400' objectFit='cover' placeholder='blur' quality='100' priority />,

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

      <div className='overflow-hidden'>
        <main className='pt-20'>
          <Banner title='Shop Our Motherboards' />
          <section className='max-w-sm xl:max-w-2xl mt-48  md:mt-60 lg:mt-96 mx-auto '>
            <AliceCarousel items={galleryItems} responsive={responsive} autoPlay autoPlayInterval='3000' infinite />
          </section>

          <section>
            <Products products={products} />
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
