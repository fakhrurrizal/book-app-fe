import axiosInterceptor from '@/config/axios.config'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { getApi } from '../constants'
import { BookCategoryResponse } from '@/types/category-response.types'

export const useAddCategory = () => {
    return useMutation<AxiosResponse<BookCategoryResponse>, AxiosError<BookCategoryResponse>, any>({
        mutationFn: async data => await axiosInterceptor.post<BookCategoryResponse>(getApi('book_category'), data),
        mutationKey: ['ADD_CATEGORY'],
    })
}

export const useEditCategory = (id: any) => {
    return useMutation<AxiosResponse<BookCategoryResponse>, AxiosError<BookCategoryResponse>, any>({
        mutationFn: async data => await axiosInterceptor.put<BookCategoryResponse>(getApi('book_category') + '/' + id, data),
        mutationKey: ['EDIT_CATEGORY'],
    })
}

export const useDeleteCategory = (id: any) => {
    return useMutation<AxiosResponse<BookCategoryResponse>, AxiosError<BookCategoryResponse>>({
        mutationFn: async () => await axiosInterceptor.delete<BookCategoryResponse>(getApi('book_category') + '/' + id),
        mutationKey: ['DELETE_CATEGORY'],
    })
}
