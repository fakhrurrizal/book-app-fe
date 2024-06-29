import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { useState, useMemo } from 'react'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import Typography from '@mui/material/Typography'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

export type TextFieldProps<T extends FieldValues = Record<string, any>> = Omit<MuiTextFieldProps, 'name'> & {
    inputFormat?: 'NORMAL' | 'NUMBER' | 'PRICE' | 'PASSWORD' | 'PHONE' | 'PPN'
    name: Path<T>
    control: Control<T>
    onValueChange?: (value: string) => void
    isReadOnly?: boolean
    variant?: 'standard' | 'outlined' | 'filled'
}

export function TextField<T extends FieldValues = Record<string, any>>(props: TextFieldProps<T>) {
    const { control, inputFormat = 'NORMAL', onValueChange, isReadOnly, variant, ...moreProps } = props

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isPasswordType = inputFormat === 'PASSWORD'

    const inputComponent: any = useMemo(() => {
        switch (inputFormat) {
            case 'PRICE':
            case 'PPN':
          

            default:
                return undefined
        }
    }, [inputFormat])

    const endAdornment = useMemo(() => {
        switch (inputFormat) {
            case 'PASSWORD':
                return (
                    <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                <VisibilityOffRoundedIcon fontSize='small' />
                            ) : (
                                <VisibilityRoundedIcon fontSize='small' />
                            )}
                        </IconButton>
                    </InputAdornment>
                )
            case 'PPN':
                return <InputAdornment position='start'>%</InputAdornment>

            default:
                return moreProps.InputProps?.endAdornment
        }
    }, [inputFormat, showPassword, moreProps.InputProps?.endAdornment])

    const startAdornment = useMemo(() => {
        switch (inputFormat) {
            case 'PHONE':
                return (
                    <InputAdornment position='start'>
                        <Typography>+62</Typography>
                    </InputAdornment>
                )

            case 'PRICE':
                return <InputAdornment position='start'>Rp</InputAdornment>

            default:
                return moreProps.InputProps?.startAdornment
        }
    }, [inputFormat, moreProps.InputProps?.startAdornment])

    return (
        <Controller
            render={({ field, fieldState, formState: { isSubmitSuccessful } }) => {
                const error = !isSubmitSuccessful && Boolean(fieldState?.error)

                const helperText = !isSubmitSuccessful && fieldState?.error?.message

                const { onChange, ...moreField } = field

                return (
                    <MuiTextField
                        {...moreProps}
                        {...moreField}
                        error={error}
                        fullWidth
                        onChange={e => {
                            if (onValueChange) {
                                onValueChange(e.target.value)
                            }
                            onChange(e)
                        }}
                        helperText={helperText}
                        type={!isPasswordType ? moreProps.type : showPassword ? 'text' : 'password'}
                        inputProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            ...moreProps.InputProps,
                            inputComponent,
                            endAdornment,
                            startAdornment,
                            autoComplete: 'off',
                            disabled: isReadOnly,
                        }}
                        variant={variant}
                        sx={{ pl: variant === 'standard' ? 1 : 0 }}
                    />
                )
            }}
            name={props.name}
            control={control}
        />
    )
}
