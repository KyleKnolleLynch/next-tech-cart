import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCartState } from '../contexts/CartContext'

const Navbar = () => {
    const router = useRouter()
    const { total_items } = useCartState()

    return (
        <nav className='fixed w-full flex justify-between items-center p-4 bg-white shadow-sm z-10'>

            <Link href='/'><a className='text-4xl flex items-center'>
                <span><img src="/images/logo.png" alt="Tech Cart" width='30px' height='30px' /></span>
                <span className='ml-4 font-medium'>Tech Cart</span>
            </a></Link>
            {router.pathname === '/' && (
                <Link href='/cart'><a className='relative'>
                    <span className='absolute -top-1 -left-4 bg-red-500 rounded-full w-3.5 h-3.5 flex justify-center items-center text-white text-xs'>{total_items}</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" /></svg>
                    </span>
                </a></Link>
            )}
        </nav>
    )
}

export default Navbar;