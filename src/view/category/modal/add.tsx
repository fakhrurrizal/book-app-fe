import { ModalCustom } from "@/components/custom-modal"
import FormDataCategory from "./formData"
import { useForm } from "react-hook-form"
import { BookCategorySchema, BookCategorySchemaForm } from "./schema"
import { objectClear } from "@/utils/object-clear.helper"
import { useAddCategory } from "@/utils/mutations/use-category"
import { queryClient } from "@/pages/_app"
import { zodResolver } from "@hookform/resolvers/zod"

interface Props {
    open: boolean
    toggle: () => void
}

const AddCategory = ({ open, toggle }: Props) => {

    const { mutateAsync: add_data } = useAddCategory()

    const form = useForm<BookCategorySchemaForm>({
        defaultValues: {
            description: "", icon: "", name: "",
        },
        resolver: zodResolver(BookCategorySchema)
    })

    const onSubmit = async (data: BookCategorySchemaForm) => {
        const dataSubmit = objectClear<BookCategorySchemaForm>(data)

        try {
            await add_data(dataSubmit)
            queryClient.invalidateQueries({ queryKey: ['LIST_BOOK_CATEGORY'] });
            toggle()
        } catch (error) {
            console.log("error", error)
        }

    }

    return (
        <ModalCustom open={open} toggle={toggle} title="Tambah Kategori" buttonOkProps={{ onClick: form.handleSubmit(onSubmit) }}>
            <FormDataCategory form={form} />
        </ModalCustom>
    )
}

export default AddCategory