import axiosInterceptor from '@/config/axios.config'
import { GeneralOption, GeneralOptionsResponse } from '@/types'
import { ApiEndpoint, getApi,  } from '@/utils'
import { useDebounce } from '@/utils/use-debounce'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import MuiTextField, { TextFieldVariants } from '@mui/material/TextField'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'
import { useQuery } from 'react-query'

interface ServerSideAutoCompleteProps<Form extends FieldValues, Option, Response>
    extends Omit<MuiAutocompleteProps<Option, boolean, boolean, boolean>, 'name' | 'renderInput' | 'options'> {
    control: Control<Form>
    name: Path<Form>
    formatOptions?: (options: Response) => Option[]
    endpoint: ApiEndpoint
    onValueChange?: MuiAutocompleteProps<Option, boolean, boolean, boolean>['onChange']
    queryEndpoint?: Record<string, number | string | boolean>
    idEndpoint?: string | number
    label?: string
    disabled?: boolean
    variant?: TextFieldVariants | undefined
    readOnly?: boolean
    defaultValue?: any
    placeholder?: string
    setTextSearch?: (searchValue: any) => void
}

export function ServerSideAutoComplete<
    Form extends FieldValues,
    Option = GeneralOption,
    Response = GeneralOptionsResponse,
>(props: ServerSideAutoCompleteProps<Form, Option, Response>) {
    const {
        control,
        name,
        endpoint,
        idEndpoint,
        disabled,
        queryEndpoint = {},
        formatOptions = res => (res as GeneralOptionsResponse).data,
        onValueChange,
        variant = 'outlined',
        label = '',
        readOnly = false,
        defaultValue = null,
        placeholder = `Pilih ${label}...`,
        setTextSearch,
        ...muiAutoCompleteProps
    } = props

    const [open, setOpen] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>('')

    const searchValue = useDebounce<string>(inputValue)

    const apiEndpoint = qs.stringifyUrl({
        url: idEndpoint ? `${getApi(endpoint)}/${idEndpoint}` : getApi(endpoint),
        query: {
            ...queryEndpoint,
            ...(searchValue ? { search: searchValue, limit: 20 } : { limit: 20 }),
        },
    })

    const {
        data = [],
        refetch: getData,
        isLoading,
    } = useQuery<Option[]>({
        queryFn: async () => {
            const res = await axiosInterceptor.get<Response>(apiEndpoint)

            const options = formatOptions(res?.data)

            return options as Option[]
        },

        queryKey: [apiEndpoint],

        enabled: false,
    })

    useEffect(() => {
        if (setTextSearch) {
            setTextSearch(searchValue)
        }
        if (open) getData()
            
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, searchValue, getData])

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { onChange, ...moreField } = field

                const error = Boolean(fieldState?.error)
                const helperText = fieldState?.error?.message

                return (
                    <MuiAutocomplete<Option, boolean, boolean, boolean>
                        {...muiAutoCompleteProps}
                        {...moreField}
                        readOnly={readOnly}
                        defaultValue={defaultValue}
                        onChange={(e, value, ...restEvent) => {
                            if (onValueChange) {
                                onValueChange(e, value, ...restEvent)
                            }
                            setInputValue('')

                            onChange(value as unknown as React.ChangeEvent<Element> | PathValue<Form, Path<Form>>)
                        }}
                        componentsProps={{
                            popper: {
                                sx: {
                                    zIndex: 10000,
                                },
                            },
                        }}
                        options={data}
                        filterSelectedOptions
                        
                        filterOptions={x => x}
                        // onInputChange={(_event, value) => {
                        //     setInputValue(value)
                        // }}
                        disabled={disabled}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        loading={isLoading}
                        renderInput={params => (
                            <MuiTextField
                                variant={variant}
                                sx={{ fontSize: 12 }}
                                {...params}
                                label={label}
                                error={error}
                                onChange={(event) => {                                    
                                    setInputValue(event.target.value)
                                }}
                                helperText={helperText}
                                InputLabelProps={{ shrink: true }}
                                placeholder={placeholder}
                            />
                        )}
                    />
                )
            }}
        />
    )
}
