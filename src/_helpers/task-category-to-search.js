export const taskCategoryToSearch = category => {
    let search = {}
    switch (category) {
        case 'important':
            search.isImportant = true
            break
        case 'done':
            search.isDone = true
            break
        case 'today':
            search.isAddedToMyDay = true
            break
        case 'planned':
            search.hasDueDate = true
            break
        case 'expireSoon':
            search.expireSoon = true
            break
    }
    return search
}