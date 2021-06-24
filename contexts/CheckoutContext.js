import { createContext, useState } from 'react'
import { useCartDispatch } from '../contexts/CartContext'
import { commerce } from '../lib/commerce'

export const CheckoutContext = createContext()

const CheckoutContextProvider = ({ children }) => {
  const [order, setOrder] = useState({})
  const [error, setErrorMessage] = useState('')
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const { setCart } = useCartDispatch()

  //!  use of below function is for stripe to commerce.js checkout functionality...it is currently not being used because I am using a mock checkout timeout function for this project instead
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )

      setOrder(incomingOrder)

      const newCart = await commerce.cart.refresh()
      setCart(newCart)
    } catch (err) {
      setErrorMessage(err.data.error.message)
    }
  }

  

  const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1)

  const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1)

  const proceed = data => {
    setShippingData(data)
    nextStep()
  }

  //  clear cart upon mock checkout
  const clearCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  //   timeout to show confirmation upon mock checkout
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
      clearCart()
    }, 3000)
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkoutToken,
        setCheckoutToken,
        proceed,
        activeStep,
        isFinished,
        order,
        shippingData,
        nextStep,
        backStep,
        handleCaptureCheckout,
        timeout,
        error,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export default CheckoutContextProvider
