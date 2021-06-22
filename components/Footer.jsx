const Footer = () => {
    return (
        <footer className='mt-10 -mb-10 py-10 lg:py-20 lg:-mb-16 xl:py-28 xl:-mb-28 bg-gradient-to-bl from-indigo-900 to-purple-400 transform -skew-y-6 relative'>
            <div className='text-center pb-10 xl:pb-14 transform skew-y-6'>
                <p className='text-white lg:text-lg xl:text-xl'>Tech Cart &copy;2021</p>
            </div>
            <div className='w-16 h-4 bg-blue-300 opacity-50 absolute left-16 -top-2 md:w-28 md:h-6 md:-top-4 lg:-top-5 lg:w-40 lg:h-8'></div>
            <div className='w-10 h-4 bg-green-300 opacity-50 absolute left-9 -top-1 md:w-16 md:h-6 lg:w-24 lg:h-8'></div>
            <div className='w-16 h-4 bg-green-300 opacity-50 absolute right-16 -top-1 md:w-28 md:h-6 lg:w-40 lg:h-8 lg:-top-1.5'></div>
            <div className='w-10 h-4 bg-blue-300 opacity-50 absolute right-9 -top-2 md:w-16 md:h-6 md:-top-3 lg:w-24 lg:h-8 lg:-top-5'></div>
        </footer>
    )
}

export default Footer;