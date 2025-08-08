interface Props {
    value: string
}

const ExpenseStatusRendererTableCustom = ({ value }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case 'in':
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = 'Cash In'
            break
        case 'out':
            badgeClass = '#ffe2e3'
            fontColor = '#ff4c51'
            label = 'Cash Out'
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

export default ExpenseStatusRendererTableCustom
