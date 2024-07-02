import { ModalCustom } from "@/components/custom-modal"
import { queryClient } from "@/pages/_app"
import { BookCategory } from "@/types/category-response.types"
import { useAddBook } from "@/utils/mutations/use-book"
import { objectClear } from "@/utils/object-clear.helper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormDataCategory from "./formData"
import { BookForm, BookSchema } from "./schema"

interface Props {
    open: boolean
    toggle: () => void
    toggleManage: () => void
    dataCategory?: BookCategory
}

const AddBook = ({ open, toggle, toggleManage, dataCategory }: Props) => {

    const { mutateAsync: add_data, isLoading } = useAddBook()

    const form = useForm<BookForm>({
        defaultValues: {
            title: "", image: "", author: "", book_code: "", category_id: null, description: "", language: "", number_of_pages: "", publication_year: "", publisher: "",
        },
        resolver: zodResolver(BookSchema)
    })

    useEffect(() => {
        if (Number(dataCategory?.id) > 0) {
            form.reset({
                category_id: { id: dataCategory?.id, label: dataCategory?.name }
            })
        }
    }, [dataCategory, form, form.reset])

    const onSubmit = async (data: BookForm) => {
        const dataSubmit = objectClear<BookForm>(data)

        try {
            await add_data(dataSubmit)
            form.reset()
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK'] });
            toggle()
            toggleManage()
        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <ModalCustom open={open} toggle={toggle} maxWidth="md" title="Tambah Buku" isLoading buttonOkProps={{ onClick: form.handleSubmit(onSubmit) }}>
            <FormDataCategory form={form} is_category={Number(dataCategory?.id) > 0} />
        </ModalCustom>
    )
}

export default AddBook