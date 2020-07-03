class SearchListen {

    constructor(text) {
        this.textObservable = text;
        this.filterAvtive = false;
    }

    setObservable(v) {
        this.textObservable = v;
    }
    setFilterActive(v) {
        console.log("value:", v)
        this.filterAvtive = v;
    }
    getFilterActive() {
        return this.filterAvtive;
    }
    getTextObservable() {
        return this.textObservable;
    }

}


export default SearchListen;