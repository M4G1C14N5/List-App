import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './template/ListTemplate'

// interface for the event
const initApp = (): void => {
    // full list instance 
    const fullList = FullList.instance
    // list template instance
    const template = ListTemplate.instance

    // add event listener to the form
    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault()
        
        // get the input value
        const input =  document.getElementById('newItem') as HTMLInputElement
        const newEntryText: string = input.value.trim() 
        if (!newEntryText.length) return // if the input is empty return
        // clear the input
        const itemId: number = fullList.list.length
           ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 // get the last item id and add 1
           : 1 // if the list is empty start with 1
        
        // create a new list item
        const newItem = new ListItem(itemId.toString(), newEntryText)
        fullList.addItem(newItem)

        // render the list
        template.render(fullList)
        
    })
    
    // add event listener to the clear button
    const clearItems = document.getElementById('clearItemsButtion') as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear() // clear display
    })

    fullList.load() // load the list from local storage
    template.render(fullList) // render the list
}
// we're not running this javascript until the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp)