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
        <div className='mt-10'>
            <h2 className='text-xl'>Shipping Address</h2>
            <form
                //  onSubmit={methods.handleSubmit((data) => proceed({ ...data, shippingState, shippingOption }))}
                className='mt-4'
                onSubmit={handleSubmit(data => proceed({ ...data, shippingState, shippingOption }))}
            >
                <div className='text-lg grid sm:grid-cols-2 gap-y-5 gap-x-4'>
                    <div>
                        <label htmlFor='firstName' className='block'>First Name</label>
                        <input type="text" name='firstName' placeholder='First Name' {...register('firstName')} className='w-full' required />
                    </div>
                    <div>
                        <label htmlFor='lastName' className='block'>Last Name</label>
                        <input type="text" name='lastName' placeholder='Last Name' {...register('lastName')} className='w-full'  required />
                    </div>
                    <div>
                        <label htmlFor='email' className='block'>Email</label>
                        <input type="email" name='email' placeholder='Email' {...register('email')} className='w-full'  required />
                    </div>
                    <div>
                        <label htmlFor='address' className='block'>Address</label>
                        <input type="text" name='address' placeholder='Address' {...register('address')} className='w-full'  required />
                    </div>
                    <div>
                        <label htmlFor='city' className='block'>City</label>
                        <input type="text" name='city' placeholder='City' {...register('city')} className='w-full'  required />
                    </div>
                    <div>
                        <label htmlFor='stateLabel' className='block'>State</label>
                        <select
                            name="stateLabel"
                            //   id="stateLabel"
                            value={shippingState}
                            onChange={e => setShippingState(e.target.value)}
                            required
                        //  {...register('stateLabel')}
                        >
                            {states.map(state => (
                                <option key={state.id} value={state.id}>{state.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='zip' className='block'>Zip</label>
                        <input type="text" name='zip' placeholder='Zip' {...register('zip')} className='w-full'  required />
                    </div>
                    <div>
                        <label htmlFor='shippingOptionsLabel' className='block'>Shipping Options</label>
                        <select
                            name="shippingOptionsLabel"
                            //  id="shippingOptionsLabel"
                            value={shippingOption}
                            onChange={e => setShippingOption(e.target.value)}
                            required
                        // {...register('shippingOptionsLabel')}
                        >
                            {options.map(option => (
                                <option key={option.id} value={option.id}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <br />
                <div className='flex justify-between mt-6'>
                    <Link href='/cart'><a>
                        <button className='text-xl border rounded-full py-1 px-4 bg-purple-500 text-white hover:bg-purple-400 focus:outline-none'>Back to Cart</button>
                    </a></Link>
                    <button type='submit' className='text-xl border rounded-full py-1 px-4 bg-green-700 text-white hover:bg-green-600 focus:outline-none'>Next</button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm
