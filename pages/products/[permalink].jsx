import Image from 'next/image'
import Link from 'next/link'
import Meta from '../../components/Meta'
import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import { useCartDispatch } from '../../contexts/CartContext'
import { commerce } from "../../lib/commerce"

export const getStaticProps = async ({ params }) => {
    const { permalink } = params

    const product = await commerce.products.retrieve(permalink, {
        type: 'permalink',
    })
    return {
        props: {
            product
        }
    }
}

export const getStaticPaths = async () => {
    const { data: products } = await commerce.products.list()

    return {
        paths: products.map(product => ({
            params: {
                permalink: product.permalink
            }
        })),
        fallback: false,
    }
}

const ProductPage = ({ product }) => {
    const { setCart } = useCartDispatch()

    const addToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }

    return (
        <>
            <Meta title={product.name} desc={product.name} keywords='motherboard product' />

            <main className='min-h-screen overflow-hidden flex flex-col justify-between relative'>
                <div className='absolute bottom-52 right-24 lg:bottom-72 lg:right-48 xl:bottom-80 xl:right-1/4 w-32 h-32 md:w-40 md:h-40 lg:w-72 lg:h-72 bg-purple-300 rounded-full opacity-60 mix-blend-multiply blur-xl filter  z-10 animate-orbs'></div>
                <div className='absolute bottom-36 right-11 lg:bottom-40 lg:right-24 xl:bottom-36 xl:right-96 w-32 h-32 md:w-40 md:h-40 lg:w-72 lg:h-72 bg-green-300 rounded-full opacity-60 mix-blend-multiply blur-xl filter  z-10 animate-orbs animation-delay-4000'></div>
                <div className='absolute bottom-52 right-10 lg:bottom-72 xl:bottom-80 xl:right-72 w-32 h-32 md:w-40 md:h-40 lg:w-72 lg:h-72 bg-blue-300 rounded-full opacity-60 mix-blend-multiply blur-xl filter  z-10 animate-orbs animation-delay-2000'></div>
                <Banner />
                <section className='sm:w-5/6 max-w-2xl sm:mx-auto mt-24 mb-16 p-4 sm:p-10 flex flex-col bg-gradient-to-tr from-gray-200 to-transparent rounded-lg z-20'>
                    <Image src={product.media.source} alt={product.name} width='450' height='450' objectFit='cover' placeholder='blur' />
                    <div className='mt-6'>
                        <div className='flex justify-between text-2xl md:text-3xl'>
                            <h2>{product.name}</h2>
                            <h2 className='ml-3'>{product.price.formatted_with_symbol}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: product.description }} className='mt-4' />
                    </div>
                    <button type='button' aria-label='Add to Cart' onClick={() => addToCart(product.id, 1)} className='mt-4 self-end border border-green-400 px-4 py-1.5 rounded-2xl hover:bg-green-600 hover:border-white group focus:outline-none'>
                        <svg className='fill-current group-hover:text-white' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 21.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195zm-13.805-4c6.712 1.617 7 9 7 9h2l-4 4-4-4h2s.94-6.42-3-9z" /></svg>
                    </button>
                    <div className='mt-10 xl:mt-14 flex justify-between'>
                        <Link href='/'><a className='text-lg'>Go to <span className='text-2xl font-medium text-purple-400 hover:text-purple-300'>Motherboards</span></a></Link>
                        <Link href='/cart'><a className='text-lg'>Go to <span className='text-2xl font-medium text-blue-500 hover:text-blue-400'>Cart</span></a></Link>
                    </div>
                </section>
                <Footer />
            </main>
        </>
    )
}

export default ProductPage;