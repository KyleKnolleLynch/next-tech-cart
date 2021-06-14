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
        <div>
            <Image
                src={media.source}
                alt={name}
                width='300'
                height='300'
                objectFit='cover'
            />
            <div>
                <h2>{name}</h2>
                <h2>{price.formatted_with_symbol}</h2>
            </div>
            <div>
                <div>
                    <button
                        onClick={decrementQty}
                        type='button'
                    >
                        -
            </button>
                    <h3>{quantity}</h3>
                    <button
                        onClick={incrementQty}
                        type='button'
                    >
                        +
            </button>
                </div>
                <button
                    onClick={removeFromCart}
                    type='button'
                >
                    Remove
          </button>
            </div>
        </div>
    )
}

export default CartItem