import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const PaymentForm = ({ shippingData, checkoutToken, backStep, nextStep, onCaptureCheckout, timeout }) => {
  
    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault()

        if (!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        if (error) {
            console.log(error)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.id, orderData)

            timeout()

            nextStep()
        }
    }


    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <hr />
            <h3 style={{ margin: '20px 0' }}>
                Payment Method
            </h3>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {(elements, stripe) => (
                        <form onSubmit={e => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br />
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={backStep}>Back</button>
                                <button type='submit'>Pay {checkoutToken.live.subtotal.formatted_with_symbol}</button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
