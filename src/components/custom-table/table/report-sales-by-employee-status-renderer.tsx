const ReportSalesByEmployeeStatusRenderer = (value: number) => {
    // let badgeClass = '#455A64'

    // let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case 1:
            label = 'VIP'
            // badgeClass = '#dcf6e8'
            // fontColor = '#28c76f'
            break
        case 2:
            label = 'Demo'
            // badgeClass = '#dcf6e8'
            // fontColor = '#28c76f'
            break
        case 3:
            label = 'Trial'
            // badgeClass = '#dcf6e8'
            // fontColor = '#28c76f'
            break
        case 4:
            label = 'Subscribe'
            // badgeClass = '#dcf6e8'
            // fontColor = '#28c76f'
            break
        case 5:
            label = 'Invited'
            // badgeClass = '#dcf6e8'
            // fontColor = '#28c76f'
            break
        case 10:
            label = 'Free'
            // badgeClass = '#dcf6e8'
            // fontColor = '#28c76f'
            break
        default:
            // badgeClass = '#ffe2e3'
            // fontColor = '#ff4c51'
            label = 'unknown'
            break
    }

    return label
}

export default ReportSalesByEmployeeStatusRenderer
