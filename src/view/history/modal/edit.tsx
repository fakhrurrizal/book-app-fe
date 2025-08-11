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
            borrow_date: data?.borrow_date ? dayjs(data?.borrow_date).format("YYYY-MM-DD") : undefined,
            due_date: data?.due_date ? dayjs(data?.due_date).format("YYYY-MM-DD") : undefined,
        })
    }, [data, form])

    const onSubmit = async (formData: BookLendingFormData) => {
        console.log('Form Data asli:', formData) // Debug 1

        // Ambil statusId dulu sebelum objectClear
        const statusId = formData.status?.id
        console.log('Status ID sebelum objectClear:', statusId) // Debug 2

        const dataSubmit = objectClear<BookLendingFormData>(formData)
        console.log('Data setelah objectClear:', dataSubmit) // Debug 3

        // Gunakan statusId yang sudah diambil sebelumnya, atau ambil dari dataSubmit jika sudah string
        const finalStatusId = statusId || (typeof dataSubmit.status === 'string' ? dataSubmit.status : undefined)
        console.log('Final Status ID:', finalStatusId) // Debug 4

        // Prepare data submit dengan status sebagai string
        const finalData: any = {
            user_id: dataSubmit.user_id,
            book_id: dataSubmit.book_id,
            status: finalStatusId,
        }

        // Tambahkan notes jika ada
        if (dataSubmit.notes) {
            finalData.notes = dataSubmit.notes
        }

        if (finalStatusId === 'borrowed') {
            finalData.borrow_date = dayjs().format('YYYY-MM-DD')
            finalData.due_date = dayjs().add(14, 'day').format('YYYY-MM-DD')
        } else if (finalStatusId === 'returned') {
            if (data?.borrow_date) {
                finalData.borrow_date = dayjs(data.borrow_date).format('YYYY-MM-DD')
            }
            if (data?.due_date) {
                finalData.due_date = dayjs(data.due_date).format('YYYY-MM-DD')
            }
            finalData.return_date = dayjs().format('YYYY-MM-DD')
        } else if (finalStatusId === 'rejected') {
        } else if (finalStatusId === 'requested') {
        } else if (finalStatusId === 'overdue') {
            if (data?.borrow_date) {
                finalData.borrow_date = dayjs(data.borrow_date).format('YYYY-MM-DD')
            }
            if (data?.due_date) {
                finalData.due_date = dayjs(data.due_date).format('YYYY-MM-DD')
            }
        }

        try {
            await edit_data(finalData)
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK_LENDING'] })
            toggle()
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <ModalCustom
            open={open}
            toggle={toggle}
            title="Ubah Status Peminjaman"
            buttonOkProps={{ onClick: form.handleSubmit(onSubmit) }}
            isLoading={isLoading}
        >
            <FormDataCategory form={form} currentStatus={data?.status} />
        </ModalCustom>
    )
}

export default EditBookLending