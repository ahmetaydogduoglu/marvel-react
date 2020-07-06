// class Observer {

//     _searchBox = ""

//     attach(value) {
//         console.log("value", value);
//         this._searchBox = value;
//     }

//     notify() {
//         return this._searchBox
//     }

// }

// export default Observer

import { Subject } from 'rxjs';

const subject = new Subject();

export const searchBoxListen = {
    sendMessage: searchBox => subject.next({ text: searchBox }),
    clearMessages: () => subject.next(),
    getMessage: () => subject.asObservable()
};
