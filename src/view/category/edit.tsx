import { ModalCustom } from "@/components/custom-modal"
import { queryClient } from "@/pages/_app"
import { BookCategory } from "@/types/category-response.types"
import { useEditCategory } from "@/utils/mutations/use-category"
import { objectClear } from "@/utils/object-clear.helper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormDataCategory from "./formData"
import { BookCategorySchema, BookCategorySchemaForm } from "./schema"

interface Props {
    open: boolean
    toggle: () => void
    data: BookCategory
}

const EditCategory = ({ open, toggle, data }: Props) => {

    const { mutateAsync: edit_data } = useEditCategory(data?.id)

    const form = useForm<BookCategorySchemaForm>({
        defaultValues: {
            description: "", icon: "", name: "", 
        },
        resolver: zodResolver(BookCategorySchema)
    })

    useEffect(() => {
        form.reset({
            description: data?.description ?? '-',
            icon: data?.icon ?? "",
            name: data?.name ?? "",
        })
    }, [data, form])

    const onSubmit = async (data: BookCategorySchemaForm) => {
        const dataSubmit = objectClear<BookCategorySchemaForm>(data)

        try {
            await edit_data(dataSubmit)
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK_CATEGORY'] });
            toggle()
        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <ModalCustom open={open} toggle={toggle} title="Edit Kategori" buttonOkProps={{ onClick: form.handleSubmit(onSubmit) }}>
            <FormDataCategory form={form} />
        </ModalCustom>
    )
}

export default EditCategory