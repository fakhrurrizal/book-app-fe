import { ReactNode } from 'react'

interface Props {
    item: any
    actionComponent?: ReactNode
}

const TableListDataTableCustom = ({ item, actionComponent }: Props) => {
    return (
        <>
            <tr className=' hover:bg-gray-50 border-b' key={item?.id}>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                    {item?.name}
                </th>
                <td className='px-6 py-4'>{item?.description}</td>
                <td className='px-6 py-4'>{item?.type}</td>
                <td className='px-6 py-4 text-center'>{actionComponent && actionComponent}</td>
            </tr>
        </>
    )
}

export default TableListDataTableCustom
