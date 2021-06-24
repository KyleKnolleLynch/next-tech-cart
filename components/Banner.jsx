const Banner = ({ title }) => {
    return (
        <section className=' absolute -top-28 left-0 right-0 py-12 md:py-24 lg:py-32 bg-gradient-to-tr from-indigo-900 to-purple-400 transform -skew-y-6 -z-10'>
            <div className='pt-36 pb-6 md:pb-4 text-center transform skew-y-6'>
                <h1 className='text-white text-3xl font-medium md:text-5xl lg:text-7xl'>{title}</h1>
            </div>
            <div className='w-16 h-4 bg-blue-300 opacity-50 absolute left-16 -bottom-2 md:w-28 md:h-6 md:-bottom-4 lg:-bottom-5 lg:w-40 lg:h-8'></div>
            <div className='w-10 h-4 bg-green-300 opacity-50 absolute left-9 -bottom-1 md:w-16 md:h-6 lg:w-24 lg:h-8'></div>
            <div className='w-16 h-4 bg-green-300 opacity-50 absolute right-16 -bottom-2 md:w-28 md:h-6 md:-bottom-4 lg:w-40 lg:h-8 lg:-bottom-6'></div>
            <div className='w-10 h-4 bg-blue-300 opacity-50 absolute right-9 -bottom-4 md:w-16 md:h-6 md:-bottom-8 lg:w-24 lg:h-8 lg:-bottom-12'></div>
        </section>
    )
}

export default Banner