
const Review = ({ checkoutToken }) => {
    return (
        <div className='mt-10'>
            <h2 className='text-xl'>Order Summary</h2>
            <ul>
                {checkoutToken.live.line_items.map(item => (
                    <li className='my-6 text-lg' key={item.name}>
                        <p>{item.name} <span>{`Quantity: ${item.quantity}`}</span></p>
                        <p>{item.line_total.formatted_with_symbol}</p>
                    </li>
                ))}
                <li className='my-8 text-lg'>
                    <p>Total</p>
                    <p className='font-bold'>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default Review
