import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useCartState } from '../contexts/CartContext'
import { CheckoutContext } from '../contexts/CheckoutContext'
import { commerce } from '../lib/commerce'
import Meta from '../components/Meta'
import Stepper from '../components/Stepper'
import AddressForm from '../components/checkoutForm/AddressForm'
import PaymentForm from '../components/checkoutForm/PaymentForm'
import Spinner from '../components/Spinner'

const steps = ['Shipping Address', 'Payment Details']



const Checkout = () => {
    const { order, checkoutToken, setCheckoutToken, shippingData, activeStep, isFinished, error } = useContext(CheckoutContext)
    const router = useRouter()
    const { id } = useCartState()


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
    }, [])

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
                    Thank you for your order, {shippingData.firstName} {shippingData.lastName}!
                </h3>
                <hr />
                <h3 className='mt-4 text-xl'>
                    You will receive a confirmation email shortly at {shippingData.email}.
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
            <h3 className='text-xl text-red-500'>
                Error: {error}
            </h3>
            <br />
            <Link href='/'><a>
                <h3 className='text-2xl text-purple-500'>Back to Home</h3>
            </a></Link>
        </>
    }

    const Form = () => activeStep === 0 ? <AddressForm /> : <PaymentForm />

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