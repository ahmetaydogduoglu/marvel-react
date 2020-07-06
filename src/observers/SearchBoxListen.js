import { Subject } from 'rxjs';

class Observer {

    searchSubject = new Subject();
    searchServices = {
        setText: text => this.searchSubject.next({ text: text }),
        clearText: () => this.searchSubject.next(),
        getText: () => this.searchSubject.asObservable()
    };


    setSearchText(value) {
        this.searchServices.setText(value);
    }

    searchTextChangeListen() {
        console.log("alkdjsakldjlskajdlkasjdlkasjdklasjdljsalkjdlkjaslkj")
        return this.searchServices.getText();
    }

    clearSearchBox() {
        return this.searchServices.clearText();
    }
}

export default Observer


// const subject = new Subject();

// export const searchBoxListen = {
//     sendMessage: searchBox => subject.next({ text: searchBox }),
//     clearMessages: () => subject.next(),
//     getMessage: () => subject.asObservable()
// };
