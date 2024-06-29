export function objectClear<T>(obj: Record<string, any>): T {
    const newObj: Record<string, any> = {}

    Object.entries(obj).forEach(([key, value]) => {
        if (value) {
            newObj[key] = value
        }
    })

    return newObj as T
}
