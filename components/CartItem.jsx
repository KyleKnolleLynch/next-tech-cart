import { useCartDispatch } from '../contexts/CartContext'
import Image from 'next/image'
import { commerce } from '../lib/commerce'


const CartItem = ({ id, media, name, price, quantity }) => {
    const { setCart } = useCartDispatch()

    const handleUpdateCart = ({ cart }) => setCart(cart)

    const removeFromCart = () => commerce.cart.remove(id).then(handleUpdateCart)

    const decrementQty = () => {
        quantity > 1 ? commerce.cart.update(id, { quantity: quantity - 1 }).then(handleUpdateCart) : removeFromCart()
    }

    const incrementQty = () => commerce.cart.update(id, { quantity: quantity + 1 }).then(handleUpdateCart)

    return (
        <div className='h-full m-auto p-6 shadow flex flex-col justify-evenly'>
            <Image
                src={media.source}
                alt={name}
                width='300'
                height='300'
                objectFit='cover'
            />
            <div className='my-2 flex justify-between text-xl'>
                <h2>{name}</h2>
                <h2>{price.formatted_with_symbol}</h2>
            </div>
            <div>
                <div className='flex items-center justify-evenly mt-2'>
                    <button
                        onClick={decrementQty}
                        type='button'
                        className='text-2xl border px-2.5 border-black rounded'
                    >
                        -
                    </button>
                    <h3 className='font-medium text-xl'>{quantity}</h3>
                    <button
                        onClick={incrementQty}
                        type='button'
                        className='text-2xl border px-2.5 border-black rounded'
                    >
                        +
                    </button>
                </div>
                <p className='text-sm text-center'>qty</p>
                <button
                    onClick={removeFromCart}
                    type='button'
                    className='text-lg outline bg-red-500 text-white rounded-full mt-4 py-0.5 px-3.5 hover:bg-red-300 focus:outline-none'
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem