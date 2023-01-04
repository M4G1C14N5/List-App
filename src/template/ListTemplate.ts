import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement, 
    clear(): void,
    render(fullList: FullList ): void,
}

// create a class named listTemplate consists of:
// export being default
// implements DOMList 
// make it singleton so we only need this one template for the entire app
// clear method should just clear out all the html in ul
// render method should render the full list 

// class 
export default class ListTemplate implements DOMList {
    ul: HTMLUListElement
    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    // methods 
    /**
     * @brief clear the ul
     * @returns void
     * 
     */
    clear(): void {
        this.ul.innerHTML = ''
    }

    /**
     * @brief render the full list
     * @param fullList
     */
    render(fullList: FullList): void {
        // clear the ul
        this.clear()
        // loop through the list and render each item
        fullList.list.forEach(item =>{
            // inside each list items there checkbox with id and a label for it 
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'

            const check = document.createElement('input') as HTMLInputElement
            check.type = 'checkbox'
            check.id = item.id // using getter to get the id
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save() // update the list in local storage
            })

            // create the label that holds the description for the item
            const label = document.createElement('label') as HTMLLabelElement
            label.htmlFor = item.id // using getter to get the id
            label.innerText = item.item // using getter to get the item 
            li.append(label) // attach lable to the li

            // create the delete button
            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            // add event listener to the button
            button.addEventListener('click', () => {
                fullList.removeItem(item.id) // remove the item from the list
                this.render(fullList) // render the list again
            })

            // attach li to the ul
            this.ul.append(li)


        })
    }                   
}