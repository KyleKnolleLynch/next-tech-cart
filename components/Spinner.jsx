const Spinner = () => {
    return (
        <div className='w-screen h-screen absolute top-0 left-0 flex justify-center items-center'>
            <div style={{ borderRight: 'solid 4px transparent' }} className='w-24 h-24 rounded-full bg-transparent border-t-4 border-indigo-400 animate-spin'></div>
        </div>
    )
}

export default Spinner;