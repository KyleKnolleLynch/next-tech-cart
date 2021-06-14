import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { commerce } from '../../lib/commerce'



const AddressForm = ({ proceed, checkoutToken }) => {
    const [shippingStates, setShippingStates] = useState([])
    const [shippingState, setShippingState] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    // const methods = useForm()
    const { register, handleSubmit, error, reset } = useForm()

    const states = Object.entries(shippingStates).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map(sO => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    const fetchShippingState = async () => {
        const { subdivisions } = await commerce.services.localeListSubdivisions('US')

        setShippingStates(subdivisions)
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        let mounted = true
        if (mounted) {
            fetchShippingState()
        }

        return () => mounted = false
    }, [])

    useEffect(() => {
        let mounted = true

        if (mounted && shippingState) {
            fetchShippingOptions(checkoutToken.id, 'US', shippingState)
        }

        return () => mounted = false
    }, [shippingState, checkoutToken.id])



    return (
        <>
            <h1>Shipping Address</h1>
            <form
                //  onSubmit={methods.handleSubmit((data) => proceed({ ...data, shippingState, shippingOption }))}
                onSubmit={handleSubmit(data => proceed({ ...data, shippingState, shippingOption }))}
            >
                <div>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <input type="text" name='firstName' placeholder='First Name' {...register('firstName')} />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type="text" name='lastName' placeholder='Last Name' {...register('lastName')} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type="email" name='email' placeholder='Email' {...register('email')} />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input type="text" name='address' placeholder='Address' {...register('address')} />
                    </div>
                    <div>
                        <label htmlFor='city'>City</label>
                        <input type="text" name='city' placeholder='City' {...register('city')} />
                    </div>
                    <div>
                        <label htmlFor='stateLabel'>State</label>
                        <select
                            name="stateLabel"
                            //   id="stateLabel"
                            value={shippingState}
                            onChange={e => setShippingState(e.target.value)}
                        //  {...register('stateLabel')}
                        >
                            {states.map(state => (
                                <option key={state.id} value={state.id}>{state.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='zip'>Zip</label>
                        <input type="text" name='zip' placeholder='Zip' {...register('zip')} />
                    </div>
                    <div>
                        <label htmlFor='shippingOptionsLabel'>Shipping Options</label>
                        <select
                            name="shippingOptionsLabel"
                            //  id="shippingOptionsLabel"
                            value={shippingOption}
                            onChange={e => setShippingOption(e.target.value)}
                        // {...register('shippingOptionsLabel')}
                        >
                            {options.map(option => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link href='/cart'><a>
                        <button>Back to Cart</button>
                    </a></Link>
                    <button type='submit'>Next</button>
                </div>
            </form>
        </>
    )
}

export default AddressForm
