import { forwardRef } from 'react'
import { IMask, IMaskInput, ReactElementProps } from 'react-imask'

interface MaskInputProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}


export const NumberMaskInput = forwardRef<any, MaskInputProps>(function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props

    return (
        <IMaskInput
            {...other}
            mask={IMask.MaskedNumber}
            inputRef={ref}
            thousandsSeparator='.'
            onAccept={(value: any) => onChange({ target: { name, value } })}
            overwrite
        />
    )
})

export const YearMaskInput = forwardRef<any, MaskInputProps>(function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props

    return (
        <IMaskInput
            {...other}
            mask={IMask.MaskedNumber}
            inputRef={ref}
            onAccept={(value: any) => onChange({ target: { name, value } })}
            overwrite
        />
    )
})
