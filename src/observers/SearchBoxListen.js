class Observer {

    constructor() {
        this.observer = ""
    }

    setObserver(value) {
        this.observer = value;
    }

    onChangeListen() {
        return this.observer;
    }

}

export default Observer
