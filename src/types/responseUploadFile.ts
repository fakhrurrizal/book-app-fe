export interface ResponseUploadFile {
    data: {
        id: string
        created_at: string
        updated_at: string
        token: string
        user_id: number
        filename: string
        full_url: string
        size: number
        filename_upload: string
    }
    message: string
    status: number
}

export interface ResponseUploadFileCsv {
    data: string[]
    message: string
}
