export const deleteFieldsIfEmpty = (obj, fieldNames) => {
    fieldNames.forEach(n => {
        if (obj[n] === '') delete obj[n]
    })
    return obj
}