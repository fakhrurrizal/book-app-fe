interface Props {
    value: string
    defaultValue: string
    defaultBadgeClass: string
    defaultFontColor: string
}

const StatusDistributionTableCustom = ({ value, defaultValue, defaultBadgeClass, defaultFontColor }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case 'dikemas':
        case 'waiting':
            badgeClass = '#BBDEFB'
            fontColor = '#1565C0'
            label = 'Dikemas'
            break
        case 'dikirim':
        case 'delivered':
            badgeClass = '#fef3c7'
            fontColor = '#fbbf24'
            label = 'Dikirim'
            break
        case 'diterima':
        case 'received':
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = 'Diterima'
            break
        default:
            badgeClass = defaultBadgeClass
            fontColor = defaultFontColor
            label = defaultValue
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

export default StatusDistributionTableCustom
