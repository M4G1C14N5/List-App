import ListItem from "./ListItem"
 interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
 }

 // create class 
 export default class FullList implements List {
    // private constructor
    // private because I only want one list for this application 

    static instance: FullList = new FullList()
    private constructor(
        private _list: ListItem[] = [],
    ){}

    // getters and setters for list
    get list(): ListItem[] {
        return this._list
    }
    
    // implementing the methods 

    /**
     * @brief load list from local storage
     * @returns void
     */
    load(): void {
        // union type to check if the list is null or not
        const storedList: string | null = localStorage.getItem('myList') // get list from local storage
        if (typeof storedList !== 'string') return // if list is null return

        // parse the list and assign it to the list
        const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList)


        parsedList.forEach(itemObj => {
            const newListItem: ListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)

        })
    }
     

    /**
     * @brief save list in local storage after it is loaded
     * @returns void
     */
    save(): void {
        // save list in local storage after it is loaded 
        localStorage.setItem('myList', JSON.stringify(this._list))
    }

    /**
     * @brief clear the FullList
     * @returns void
     */
    clearList(): void {
        this._list = []
        this.save()
    }

    /**
     * @brief add item to the FullList
     * @param itemObj
     * @returns void
    */
   addItem(itemObj: ListItem): void {
         this._list.push(itemObj)
         this.save()
   }

    /**
     * @brief remove item from the FullList
     * @param id
     * @returns void
     */
    removeItem(id: string): void {
        // filter the items in the list and return the items that do not match the id
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }



    

 }