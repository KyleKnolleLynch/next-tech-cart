import Layout from '../components/Layout'
import { CartProvider } from '../contexts/CartContext'
import CheckoutContextProvider from '../contexts/CheckoutContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <CheckoutContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CheckoutContextProvider>
    </CartProvider>
  )
}

export default MyApp
