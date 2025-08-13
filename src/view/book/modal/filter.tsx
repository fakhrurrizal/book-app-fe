import { ServerSideAutoComplete, StaticAutoComplete } from "@/components/auto-complete.component";
import { ModalCustom } from "@/components/custom-modal";
import { BookCategoryResponse } from "@/types/category-response.types";
import { Grid } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { SchemaForm } from "../../../pages/category/[ID]";
import { useRouter } from "next/router";

interface Props {
    open: boolean;
    toggle: () => void;
    form: UseFormReturn<SchemaForm>
}


const optionSort = [
    { id: "title", label: "Urutkan berdasarkan Alfabet" },
    { id: "publication_year", label: "Urutkan berdasarkan Tahun Terbit" },
];

const optionOrder = [
    { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
    { id: "asc", label: "Urutkan dari Terkecil ke Terbesar" },
];

const FilterBook = ({ open, toggle, form }: Props) => {

    const router = useRouter()

    const { ID } = router.query

    const submit = async (data: SchemaForm) => {
        toggle();
    };

    const handleReset = () => {
        form.reset({
            category_id: { id: 0, label: "Semua Kategori" },
            order: { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
            sort: { id: "title", label: "Urutkan berdasarkan Alfabet" },
        });
        toggle();
    };

    return (
        <ModalCustom
            open={open}
            toggle={toggle}
            title="Filter buku"
            buttonDeleteProps={{ onClick: handleReset }}
            buttonOkProps={{ onClick: form.handleSubmit(submit), children: "Filter" }}
        >
            <Grid container spacing={2}>
                {!ID &&
                    <Grid item xs={12}>
                        <ServerSideAutoComplete<SchemaForm, { id: number; label: string }, BookCategoryResponse>
                            queryEndpoint={{ status: true, app_id: 1 }}
                            control={form.control}
                            endpoint="book_category"
                            name="category_id"
                            label="Pilih Kategori"
                            formatOptions={(response) => {
                                const options = response.data;
                                if (!options) return [];
                                return options.map((option) => ({
                                    id: option.id,
                                    label: option.name,
                                }));
                            }}
                        />
                    </Grid>
                }
                <Grid item xs={12}>
                    <StaticAutoComplete control={form.control} label="Urutkan" name="sort" options={optionSort} />
                </Grid>
                <Grid item xs={12}>
                    <StaticAutoComplete control={form.control} label="" name="order" options={optionOrder} />
                </Grid>
            </Grid>
        </ModalCustom>
    );
};

export default FilterBook;
