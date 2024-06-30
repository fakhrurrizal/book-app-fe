import { forwardRef } from 'react'
import { IMask, IMaskInput } from 'react-imask'
import { ReactElement } from 'react-imask/dist/mixin'

interface MaskInputProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}


export const NumberMaskInput = forwardRef<ReactElement, MaskInputProps>(function TextMaskCustom(props, ref) {
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

export const YearMaskInput = forwardRef<ReactElement, MaskInputProps>(function TextMaskCustom(props, ref) {
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
