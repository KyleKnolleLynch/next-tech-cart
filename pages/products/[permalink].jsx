import Image from 'next/image'
import Link from 'next/link'
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
        <div className='w-4/5 max-w-xl mx-auto pt-20 flex flex-col'>
            <Image src={product.media.source} width='500' height='500' objectFit='cover' />
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
            <Link href='/'><a className='block mt-10 text-2xl group'>Back to <span className='font-medium text-purple-400 group-hover:text-purple-300'>Motherboards</span></a></Link>
        </div>
    )
}

export default ProductPage;