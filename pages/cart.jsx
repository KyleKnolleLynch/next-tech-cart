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
            <div className='mt-6 text-center text-lg'>
                Your cart is currently empty.
                <Link href='/'>
                    <a className='block mt-4 text-purple-500 text-xl font-medium'>
                        {' '}Start shopping for motherboards!
                    </a>
                </Link>
            </div>
        )
    }

    const FilledCart = () => {
        return (
            <div className='max-w-2xl mx-auto'>
                <div className='grid sm:grid-cols-2 gap-4 mt-6'>
                    {line_items.map(item => (
                        <div key={item.id}>
                            <CartItem
                                {...item}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className='text-xl mt-6'>
                        Subtotal: {subtotal.formatted_with_symbol}
                    </h2>
                    <div className='flex justify-between mt-6'>
                        <button
                            onClick={handleEmptyCart}
                            type='button'
                            className='text-xl border rounded-full py-1 px-4 bg-red-500 text-white hover:bg-red-300 focus:outline-none'
                        >
                            Empty Cart
                        </button>
                        <Link href='/checkout'>
                            <a>
                                <button
                                    type='button'
                                    className='text-xl border rounded-full py-1 px-4 bg-green-700 text-white hover:bg-green-600 focus:outline-none'
                                >
                                    Checkout
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (!line_items)
        return (
            <div className='mt-24 text-center text-xl'>
                Loading...
            </div>
        )


    return (
        <>
            <Meta title='Tech Cart | My Cart' desc='my shopping cart page for tech cart app' keywords='shopping cart motherboards' />

            <div className='pt-20 pb-10 px-6'>
                <h1 className='text-2xl md:text-3xl text-center'>My Cart</h1>
                {line_items.length ? <FilledCart /> : <EmptyCart />}
            </div>

        </>
    )
}

export default Cart;