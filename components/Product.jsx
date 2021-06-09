import Image from 'next/image'
import Link from 'next/link'
import { useCartDispatch } from '../contexts/CartContext'
import { commerce } from '../lib/commerce'


const Product = ({ media, name, price, permalink, description, id }) => {
    const { setCart } = useCartDispatch()

    const addToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }

    return (
        <div>
            <Link href={`/products/${permalink}`}><a>
                <Image src={media.source} width='300' height='300' objectFit='cover' />
                <div>
                    <div>
                        <h2>{name}</h2>
                        <h2>{price.formatted_with_symbol}</h2>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </a></Link>
            <button type='button' aria-label='Add to Cart' onClick={() => addToCart(id, 1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 21.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.305-15l-3.432 12h-10.428l-3.777-9h-2.168l4.615 11h13.239l3.474-12h1.929l.743-2h-4.195zm-13.805-4c6.712 1.617 7 9 7 9h2l-4 4-4-4h2s.94-6.42-3-9z" /></svg>
            </button>
        </div>
    )
}

export default Product;