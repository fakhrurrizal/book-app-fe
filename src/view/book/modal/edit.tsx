import { ModalCustom } from "@/components/custom-modal"
import { queryClient } from "@/pages/_app"
import { useEditBook } from "@/utils/mutations/use-book"
import { objectClear } from "@/utils/object-clear.helper"
import { useForm } from "react-hook-form"
import FormDataCategory from "./formData"
import { BookForm, BookSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { DataBook } from "@/types/book-response.types"
import { useEffect } from "react"

interface Props {
    open: boolean
    toggle: () => void
    data: DataBook
}

const EditBook = ({ open, toggle, data }: Props) => {

    const { mutateAsync: add_data, isLoading } = useEditBook(data?.id)

    const form = useForm<BookForm>({
        defaultValues: {
            title: "", image: "", author: "", book_code: "", category_id: null, description: "", language: "", number_of_pages: "", stock: "", publication_year: "", publisher: "",
        },
        resolver: zodResolver(BookSchema)
    })

    useEffect(() => {
        form.reset({
            author: data?.author ?? "",
            book_code: data?.book_code ?? "",
            description: data?.description ?? "",
            image: data?.image ?? "",
            language: data?.language ?? "",
            category_id: data?.category?.id > 0 ? { id: data?.category?.id, label: data?.category?.name } : null,
            publisher: data?.publisher ?? "",
            title: data?.title ?? "",
            number_of_pages: data?.number_of_pages.toString() ?? "",
            stock: data?.stock.toString() ?? "",
            publication_year: data?.publication_year.toString() ?? "",
        })
    }, [data, form, form.reset])

    const onSubmit = async (data: BookForm) => {
        const dataSubmit = objectClear<BookForm>(data)

        try {
            await add_data(dataSubmit)
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK'] });
            toggle()
        } catch (error) {
            console.log("error", error)
        }

    }

    const handleClose = () => {
        toggle()
        form.reset()
    }

    return (
        <ModalCustom open={open} toggle={handleClose} maxWidth="md" title={`Edit Buku `} isLoading={isLoading} buttonOkProps={{ onClick: form.handleSubmit(onSubmit) }}>
            <FormDataCategory form={form} isEdit />
        </ModalCustom>
    )
}

export default EditBook