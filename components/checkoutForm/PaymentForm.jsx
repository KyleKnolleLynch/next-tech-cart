import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ shippingData, checkoutToken, backStep, nextStep, onCaptureCheckout, timeout }) => {

    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault()

        ////////////////////////////////////////////////
        //! currently using mock checkout functionality for this sandbox project...the commented out code below would handle proper stripe to chec.io/commerce.js functionality  
        ////////////////////////////////////////////////

        // if (!stripe || !elements) return

        // const cardElement = elements.getElement(CardElement)

        // const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        // if (error) {
        //     console.log(error)
        // } else {
        // const orderData = {
        //     line_items: checkoutToken.live.line_items,
        //     customer: {
        //         firstname: shippingData.firstName,
        //         lastname: shippingData.lastName,
        //         email: shippingData.email
        //     },
        //     shipping: {
        //         name: 'Primary',
        //         street: shippingData.address1,
        //         town_city: shippingData.city,
        //         county_state: shippingData.shippingState,
        //         postal_zip_code: shippingData.zip,
        //         country: 'US',
        //     },
        //     fulfillment: { shipping_method: shippingData.shippingOption },
        //     payment: {
        //         gateway: 'stripe',
        //         stripe: {
        //             payment_method_id: paymentMethod.id
        //         }
        //     }
        // }

        onCaptureCheckout(checkoutToken.id, shippingData)

        timeout()

        nextStep()
        // }
    }


    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <hr />
            <h3 className='my-6 text-lg'>
                Payment Method
            </h3>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {(elements, stripe) => (
                        <form onSubmit={e => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <div className='flex justify-between mt-14 mb-6'>
                                <button onClick={backStep} className='text-xl border rounded-full py-1 px-4 bg-purple-500 text-white hover:bg-purple-400 focus:outline-none'>Back</button>
                                <button type='submit' className='text-2xl border rounded-full py-1 px-4 bg-yellow-400 text-indigo-800 hover:bg-yellow-300 focus:outline-none'>Pay {checkoutToken.live.subtotal.formatted_with_symbol}</button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
