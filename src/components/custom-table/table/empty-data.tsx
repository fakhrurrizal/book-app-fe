import Image from "next/image"

const EmptyDataTableCustom = () => {
    return (
        <>
            <div className='w-full h-[300px] flex flex-col gap-3 items-center justify-center'>
                <Image
                    src='/not-found.png'
                    alt='data empty'
                    className='w-full h-auto object-cover max-w-[250px]'
                    width={250}
                    height={250}
                />
                <p>Data Kosong</p>
            </div>
        </>
    )
}

export default EmptyDataTableCustom
