import { createContext, useReducer, useEffect, useContext } from 'react'
import { commerce } from '../lib/commerce'

const CartContext = createContext()
const CartDispatchContext = createContext()

const SET_CART = 'SET_CART'

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let mounted = true

    if (mounted) {
    getCart()
    }

    return () => mounted = false
  }, [])

  const setCart = payload => dispatch({ type: SET_CART, payload })

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve()

      setCart(cart)
    } catch (error) {
      console.log(`getCart error: ${error}`)
    }
  }

  return (
    <CartDispatchContext.Provider value={{ setCart }}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCartState = () => useContext(CartContext)
export const useCartDispatch = () => useContext(CartDispatchContext)

// const CartContextProvider = ({ children }) => {
//   const [products, setProducts] = useState([])
//   const [cart, setCart] = useState({})

//   const addToCart = async (productId, quantity) => {
//     try {
//       const { cart } = await commerce.cart.add(productId, quantity)
//       setCart(cart)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const updateCart = async (productId, quantity) => {
//     try {
//       const { cart } = await commerce.cart.update(productId, { quantity })
//       setCart(cart)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const removeFromCart = async productId => {
//     try {
//       const { cart } = await commerce.cart.remove(productId)
//       setCart(cart)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const emptyCart = async () => {
//     try {
//       const { cart } = await commerce.cart.empty()
//       setCart(cart)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const refreshCart = async () => {
//     try {
//       setCart(await commerce.cart.refresh())
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <CartContext.Provider
//       value={{
//         products,
//         setProducts,
//         cart,
//         setCart,
//         addToCart,
//         updateCart,
//         removeFromCart,
//         emptyCart,
//         refreshCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// export default CartContextProvider
