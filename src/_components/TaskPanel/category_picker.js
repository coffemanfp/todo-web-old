import { useState } from "react"
import { useWatch } from "react-hook-form"
import { useSelector } from "react-redux"

export function CategoryPicker({ register, control, setValue }) {
    const { categories } =
        useWatch({ control, names: ["categories"] })

    const [isCategoryPickerActive, setIsCategoryPickerActive] = useState(false)

    let globalCategories = useSelector(state => state.category.categories)
    if (categories && categories.length > 0) {
        globalCategories = globalCategories.filter(gc => {
            return categories.findIndex(c => gc.id === c.id) === -1
        })
    }

    const removeTaskCategory = category => {
        return () => {
            const newCategories = categories.filter(c => {
                return c.id !== category.id
            })
            setValue('categories', newCategories)
        }
    }

    const addTaskCategory = newCategory => {
        return () => {
            const newCategories = categories ? [...categories, newCategory] : [newCategory]
            setValue('categories', newCategories)
            setIsCategoryPickerActive(false)
            globalCategories = globalCategories.filter(c => {
                return c.id !== newCategory.id
            })
        }
    }

    const handleCategoryPicker = e => {
        if ((e.target.className === 'task-panel__button' || e.target.className === 'task-panel__categories') && globalCategories.length > 0) {
            setIsCategoryPickerActive(!isCategoryPickerActive)
        }
    }

    const categoriesMap = new Map(categories?.map(c => [c.id, true]))
    const categoriesElem = globalCategories?.map(c => {
        if (!categoriesMap.has(c.id)) {
            return (
                <label key={c.color} className={"category-picker__option category-picker__option--" + c.color}>
                    Category {c.color}
                    <input id={c.color} type="checkbox" className="task-panel__button-input"
                        onClick={addTaskCategory(c)}
                    />
                </label>
            )
        }
    })

    const taskCategoriesElem = categories?.map(c => {
        return (
            <label key={c.color} className={"task-panel__category task-panel__category--" + c.color}>
                {c.color}
                <input id={c.color} type="checkbox" className="task-panel__button-input"
                    onClick={removeTaskCategory(c)}
                />
            </label>
        )
    })

    return (
        <button type="button" className="task-panel__button" onClick={handleCategoryPicker}>
            <i className="task-panel__button-icon bx bx-purchase-tag-alt"></i>
            <div className="task-panel__categories">
                {taskCategoriesElem}
                Pick a category
            </div>
            {isCategoryPickerActive &&
                <ul className="category-picker">
                    <input type="text" className="task-panel__button-input"
                        {...register('categories')}
                    />
                    {categoriesElem}
                </ul>
            }
        </button>
    )
}