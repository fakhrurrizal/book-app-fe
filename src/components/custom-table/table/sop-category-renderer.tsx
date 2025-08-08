interface Props {
    value: string
}

const KategoriRenderer = ({ value }: Props) => {
    // const theme = useTheme()

    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case 'buka':
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = 'BUKA'
            break
        case 'tutup':
            badgeClass = '#ffe2e3'
            fontColor = '#ff4c51'
            label = 'TUTUP'
            break

        // badgeClass = theme.palette.success.main

        // label = 'Free'
        // break
        default:
            badgeClass = 'grey'

            label = 'unknown'
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

export default KategoriRenderer
