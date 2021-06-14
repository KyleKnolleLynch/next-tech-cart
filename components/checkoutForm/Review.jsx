
const Review = ({ checkoutToken }) => {
    return (
        <>
            <h1>Order Summary</h1>
            <ul>
                {checkoutToken.live.line_items.map(item => (
                    <li style={{ padding: '10px 0' }} key={item.name}>
                        <p>{item.name} <span>{`Quantity: ${item.quantity}`}</span></p>
                        <p>{item.line_total.formatted_with_symbol}</p>
                    </li>
                ))}
                <li style={{ padding: '10px 0' }}>
                    <p>Total</p>
                    <p style={{ fontWeight: '600' }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </p>
                </li>
            </ul>
        </>
    )
}

export default Review
