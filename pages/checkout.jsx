import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCartState } from '../contexts/CartContext'
import { useCartDispatch } from '../contexts/CartContext'
import { commerce } from '../lib/commerce'
import Meta from '../components/Meta'
import Stepper from '../components/Stepper'
import AddressForm from '../components/checkoutForm/AddressForm'
import PaymentForm from '../components/checkoutForm/PaymentForm'
import Spinner from '../components/Spinner'

const steps = ['Shipping Address', 'Payment Details']



const Checkout = () => {
    const [order, setOrder] = useState({})
    const [error, setErrorMessage] = useState('')
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const router = useRouter()
    const { id } = useCartState()
    const { setCart } = useCartDispatch()

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

    useEffect(() => {
        let mounted = true

        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(id, { type: 'cart' })

                setCheckoutToken(token)
            } catch (err) {
                router.push('/')
            }
        }
        if (mounted) {
            generateToken()
        }

        return () => mounted = false
    }, [id])

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
        }, 3000)
        clearCart()
    }

    let Confirmation = () => order.customer ? (
        <>
            <div className='mt-10'>
                <h3 className='text-2xl'>
                    Thank you for your order, {order.customer.firstname} {order.customer.lastname}
                </h3>
                <hr />
                <h3 className='mt-4 text-2xl'>
                    Order ref: {order.customer_reference}
                </h3>
            </div>
            <Link href='/'><a className='text-2xl mt-10 block'>
                <h3>Back to <span className='text-purple-500 hover:text-purple-400 font-medium'>Home</span></h3>
            </a></Link>
        </>
    ) : isFinished ? (
        <>
            <div className='mt-10'>
                <h3 className='text-2xl'>
                    Thank you for your order!
                </h3>
                <hr />
                <h3 className='mt-4 text-xl'>
                    You will receive a confirmation email shortly.
                </h3>
            </div>
            <Link href='/'><a className='text-2xl mt-10 block'>
                <h3>Back to <span className='text-purple-500 hover:text-purple-400 font-medium'>Home</span></h3>
            </a></Link>
        </>
    ) : (
        <div>
            <Spinner />
        </div>
    )

    if (error) {
        <>
            <h3>
                Error: {error}
            </h3>
            <br />
            <Link href='/'><a>
                <h3>Back to Home</h3>
            </a></Link>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm proceed={proceed} checkoutToken={checkoutToken} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={handleCaptureCheckout} timeout={timeout} />

    return (
        <>
            <Meta title='Tech Cart | Checkout' desc='Tech Cart app checkout page' keywords='motherboards checkout' />
            <main className='pt-20 p-4 max-w-2xl mx-auto'>
                <h1 className='text-center text-2xl'>
                    Checkout
                </h1>
                <Stepper
                    steps={steps}
                    currentStepNumber={activeStep}
                />
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </main>
        </>
    )
}

export default Checkout