import React from 'react'

interface Props {
    value: boolean
    trueLabel?: string
    falseLabel?: string
}

const ActiveInactiveRendererTableCustom = ({ value, trueLabel, falseLabel }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case true:
            badgeClass = '#dcf6e8'
            fontColor = '#28c76f'
            label = trueLabel || 'Active'
            break
        case false:
            badgeClass = '#ffe2e3'
            fontColor = '#ff4c51'
            label = falseLabel || 'Inactive'
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

export default ActiveInactiveRendererTableCustom

export const LevelRendererTableCustom = ({ value }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case true:
            badgeClass = '#FFF59D'
            fontColor = '#F9A825'
            label = 'Head Office'
            break
        case false:
            badgeClass = '#F5F5F5'
            fontColor = '#9E9E9E'
            label = 'Branch'
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

export const DefaultStatusRendererTableCustom = ({ value }: Props) => {
    let badgeClass = '#455A64'

    let fontColor = '#D81B60'

    let label = ''

    switch (value) {
        case true:
            badgeClass = '#FFF59D'
            fontColor = '#F9A825'
            label = 'Default'
            break
        case false:
            badgeClass = '#F5F5F5'
            fontColor = '#9E9E9E'
            label = 'Optional'
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
