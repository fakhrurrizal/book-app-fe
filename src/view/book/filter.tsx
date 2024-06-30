import { ServerSideAutoComplete, StaticAutoComplete } from "@/components/auto-complete.component";
import { ModalCustom } from "@/components/custom-modal";
import { BookCategoryResponse } from "@/types/category-response.types";
import { Grid } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { SchemaForm } from "../../pages/category/[ID]";

interface Props {
    open: boolean;
    toggle: () => void;
    form: UseFormReturn<SchemaForm>
}


const optionSort = [
    { id: "title", label: "Sort berdasarkan Alfabet" },
    { id: "publication_year", label: "Sort berdasarkan Tahun Terbit" },
];

const optionOrder = [
    { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
    { id: "asc", label: "Urutkan dari Terkecil ke Terbesar" },
];

const FilterBook = ({ open, toggle, form }: Props) => {

    const submit = async (data: SchemaForm) => {
        toggle();
    };

    const handleReset = () => {
        form.reset({
            category_id: { id: 0, label: "Semua Kategori" },
            order: { id: "desc", label: "Terbesar Ke Terkecil" },
            sort: { id: "title", label: "Sort berdasarkan Alfabet" },
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
                <Grid item xs={12}>
                    <StaticAutoComplete control={form.control} label="Sort" name="sort" options={optionSort} />
                </Grid>
                <Grid item xs={12}>
                    <StaticAutoComplete control={form.control} label="Urutan" name="order" options={optionOrder} />
                </Grid>
            </Grid>
        </ModalCustom>
    );
};

export default FilterBook;
