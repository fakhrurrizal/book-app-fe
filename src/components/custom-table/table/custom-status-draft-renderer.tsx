interface Props {
    value: boolean
}

const StatusDraftRendererTableCustom = ({ value }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case true:
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = 'Submitted'
            break
        case false:
            badgeClass = '#fef3c7'
            fontColor = '#fbbf24'
            label = 'Draft'
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

export default StatusDraftRendererTableCustom
