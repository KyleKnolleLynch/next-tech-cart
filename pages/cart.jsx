import Meta from '../components/Meta'
import { useCartState } from '../contexts/CartContext'
import { useCartDispatch } from '../contexts/CartContext'
import Link from 'next/link'
import CartItem from '../components/CartItem'
import { commerce } from '../lib/commerce'

const Cart = () => {
    const { line_items, subtotal } = useCartState()
    const { setCart } = useCartDispatch()

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    const EmptyCart = () => {
        return (
            <div>
                Your cart is currently empty.
                <Link href='/'>
                    <a>
                        {' '}Start shopping for motherboards!
            </a>
                </Link>
            </div>
        )
    }

    const FilledCart = () => {
        return (
            <>
                <div>
                    {line_items.map(item => (
                        <div key={item.id}>
                            <CartItem
                                {...item}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <h2>
                        Subtotal: {subtotal.formatted_with_symbol}
                    </h2>
                    <div>
                        <button
                            onClick={handleEmptyCart}
                            type='button'
                        >
                            Empty Cart
              </button>
                        <Link href='/checkout'>
                            <a>
                                <button
                                    type='button'
                                >
                                    Checkout
                </button>
                            </a>
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    if (!line_items)
        return (
            <div>
                Loading...
            </div>
        )


    return (
        <>
            <Meta title='Tech Cart | My Cart' desc='my shopping cart page for tech cart app' keywords='shopping cart motherboards' />

            <div>
                <h1>My Cart</h1>
                {line_items.length ? <FilledCart /> : <EmptyCart />}
            </div>

        </>
    )
}

export default Cart;