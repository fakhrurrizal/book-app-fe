export const endpoints = {
    book: "book",
    book_category: "book-category",
    upload: 'file'
} as const

export type ApiEndpoint = keyof typeof endpoints

export const getApi: (key: ApiEndpoint) => string = key => {
    const host = process.env.NEXT_PUBLIC_API

    return `${host}/v1/${endpoints[key]}`
}
