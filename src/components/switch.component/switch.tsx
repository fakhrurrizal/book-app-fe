import { FormControlLabel } from '@mui/material'
import { Switch } from '@mui/material'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export type SwitchProps<T extends FieldValues = Record<string, any>> = {
    name: Path<T>
    control: Control<T>
    onValueChange?: (value: boolean) => void
    label: any
    readOnly?: boolean
}

export function SwitchComponent<T extends FieldValues = Record<string, any>>(props: SwitchProps<T>) {
    const { control, onValueChange, label, readOnly = false, ...moreProps } = props

    return (
        <Controller
            render={({ field }) => {
                const { onChange, ...moreField } = field

                return (
                    <FormControlLabel
                        control={
                            <Switch
                                {...moreProps}
                                {...moreField}
                                checked={field?.value}
                                // defaultChecked={field?.value}
                                disabled={readOnly}
                                onChange={e => {
                                    const newValue = e.target.checked
                                    if (onValueChange) {
                                        onValueChange(newValue)
                                    }
                                    onChange(e.target.checked)
                                }}
                            />
                        }
                        label={label}
                    />
                )
            }}
            name={props.name}
            control={control}
        />
    )
}
