import { ResponseGetMe } from "@/utils/api-response/user"

export interface ResponseLogin {
    data?: {
        access_token: string
        expiration: string
        user: ResponseGetMe['data']
    }
}
