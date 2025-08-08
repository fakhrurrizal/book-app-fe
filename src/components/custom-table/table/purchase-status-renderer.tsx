import dayjs from 'dayjs'

interface Props {
    value: boolean
    is_partially_paid?: boolean
}

const PaymentStatusRendererTableCustom = ({ value, is_partially_paid }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case true:
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = 'Lunas'
            break
        case false:
            badgeClass = '#ffe2e3'
            fontColor = '#ff4c51'
            label = 'Belum Dibayar'
            break
    }

    if (is_partially_paid) {
        badgeClass = '#BBDEFB'
        fontColor = '#1565C0'
        label = 'Sebagian Dibayar'
    }

    return (
        <div className='flex justify-center'>
            <p
                style={{
                    backgroundColor: badgeClass,
                    color: fontColor,
                }}
                className='!rounded-md min-w-[130px] py-2 px-2 font-semibold'
            >
                {label}
            </p>
        </div>
    )
}

export default PaymentStatusRendererTableCustom

export const SalesStatusRendererTableCustom = ({ expiration_date, status, is_partially_paid }: any) => {
    // let badgeClass = '#455A64'
    // let fontColor = '#D81B60'
    let label = ''

    const today = dayjs()
    const expirationDate = dayjs(expiration_date)

    const is_expiration = expirationDate.isBefore(today) || expirationDate === null

    if (is_expiration) {
        // badgeClass = '#ffe2e3'
        // fontColor = '#ff4c51'
        label = 'Pembayaran Gagal'

        return
    }

    // Kondisi untuk 'Belum Lunas' jika partially true dan status false
    if (is_partially_paid && status === false) {
        // badgeClass = '#ffddc1'
        // fontColor = '#ff7f50'
        label = 'Partially Paid'
    } else {
        switch (status) {
            case false:
                // badgeClass = '#ffe2e3'
                // fontColor = '#ff4c51'
                label = 'Unpaid'
                break
            case true:
                // badgeClass = '#dcf6e8'
                // fontColor = '#28c76f'
                label = 'Paid'
                break
        }
    }

    return (
        <div className='flex justify-center'>
            <p
                // style={{
                //     backgroundColor: badgeClass,
                //     color: fontColor,
                // }}
                className='!rounded-md min-w-[150px] py-2 font-semibold'
            >
                {label}
            </p>
        </div>
    )
}
