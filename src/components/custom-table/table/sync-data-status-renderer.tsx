interface Props {
    value: string
}

export const SyncDataStatusRenderer = ({ value }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case 'finished':
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = 'Selesai'
            break
        case 'failed':
            badgeClass = '#ffe2e3'
            fontColor = '#ff4c51'
            label = 'Gagal'
            break
        case 'processed':
            badgeClass = '#E0F2FE'
            fontColor = '#2196F3'
            label = 'Proses'
            break
    }

    return (
        <div className='flex justify-center'>
            <p
                style={{
                    backgroundColor: badgeClass,
                    color: fontColor,
                }}
                className='!rounded-md min-w-[100px] py-2 font-semibold'
            >
                {label}
            </p>
        </div>
    )
}
