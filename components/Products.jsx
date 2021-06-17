import Product from './Product'

const Products = ({ products }) => {
    return (
        <div className='max-w-screen-xl grid sm:grid-cols-2 lg:grid-cols-3  gap-4 mx-auto px-4 py-20'>
            {products.map(product => (
                <Product key={product.id} {...product} />
            ))}
        </div>
    )
}

export default Products;