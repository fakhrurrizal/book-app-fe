import { ServerSideAutoComplete, StaticAutoComplete } from "@/components/auto-complete.component";
import { ModalCustom } from "@/components/custom-modal";
import { BookCategoryResponse } from "@/types/category-response.types";
import { Grid } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { BookCategoryFilterForm } from "./schema";

interface Props {
    open: boolean;
    toggle: () => void;
    form: UseFormReturn<BookCategoryFilterForm>
}


const optionSort = [
    { id: "title", label: "Urutkan berdasarkan Alfabet" },
    { id: "publication_year", label: "Urutkan berdasarkan Tahun Terbit" },
];

const optionOrder = [
    { id: "desc", label: "Urutkan dari Terbesar ke Terkecil" },
    { id: "asc", label: "Urutkan dari Terkecil ke Terbesar" },
];

const FilterCategoryBook = ({ open, toggle, form }: Props) => {

    const submit = async (data: BookCategoryFilterForm) => {
        toggle();
    };

    const handleReset = () => {
        form.reset({
            order: { id: "desc", label: "Terbesar Ke Terkecil" },
            sort: { id: "id", label: "Diurutkan Berdasarkan ID" },
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
                    <StaticAutoComplete control={form.control} label="Urutkan" name="sort" options={optionSort} />
                </Grid>
                <Grid item xs={12}>
                    <StaticAutoComplete control={form.control} label="Urutan" name="order" options={optionOrder} />
                </Grid>
            </Grid>
        </ModalCustom>
    );
};

export default FilterCategoryBook;
