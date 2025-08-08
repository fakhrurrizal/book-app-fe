import { ModalCustom } from "@/components/custom-modal"
import { queryClient } from "@/pages/_app"
import { useBookLendingEdit } from "@/view/book-lending/services/lending-book.mutation"
import { BookLendingFormData, bookLendingSchema } from "@/view/book-lending/services/lending-book.schemas"
import { objectClear } from "@/utils/object-clear.helper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormDataCategory, { Status } from "./formData"
import dayjs from "dayjs"

interface Props {
    open: boolean
    toggle: () => void
    data: any
}

const EditBookLending = ({ open, toggle, data }: Props) => {

    const { mutateAsync: edit_data, isLoading } = useBookLendingEdit(data?.id)

    const form = useForm<BookLendingFormData>({
        defaultValues: {
            notes: '',
            book_id: 0,
            user_id: 0,
            status: null
        },
        resolver: zodResolver(bookLendingSchema)
    })

    useEffect(() => {
        form.reset({
            status: Status?.find((item) => item?.id === data?.status),
            book_id: data?.book?.id,
            user_id: data?.user?.id,
            notes: data?.notes,
            borrow_date: dayjs(data?.borrow_date).format("YYYY-MM-DD"),
            due_date: dayjs(data?.due_date).format("YYYY-MM-DD"),
        })
    }, [data, form])

    const onSubmit = async (data: BookLendingFormData) => {
        const dataSubmit = objectClear<BookLendingFormData>(data)

        const currentDate = dayjs().format('YYYY-MM-DD')

        if (dataSubmit.status?.id === 'borrowed') {
            dataSubmit.borrow_date = currentDate
        } else if (dataSubmit.status?.id === 'returned') {
            dataSubmit.return_date = currentDate
        }

        try {
            await edit_data({ ...dataSubmit })
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK_LENDING'] })
            toggle()
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <ModalCustom open={open} toggle={toggle} title="Ubah Status Peminjaman" buttonOkProps={{ onClick: form.handleSubmit(onSubmit) }} isLoading={isLoading}>
            <FormDataCategory form={form} />
        </ModalCustom>
    )
}

export default EditBookLending