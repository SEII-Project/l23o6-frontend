interface storageFuncType{
    getItem(key:string):any;
    setItem(key:string, value:string):void;
    removeItem(key:string):void;
    clear():void;
}

class sessionStorageProxy implements storageFuncType {
    private storage :storageFuncType;

    constructor(storageModel :storageFuncType) {
        this.storage = storageModel;
    }

    getItem(key: string): any {
        return JSON.parse(this.storage.getItem(key)) || null
    }

    setItem(key: string, value: string) {
        this.storage.setItem(key, JSON.stringify(value))
    }

    removeItem(key: string) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear();
    }
}

class localStorageProxy extends sessionStorageProxy implements storageFuncType {
    constructor(localStorage :storageFuncType) {
        super(localStorage);
    }
}

export const storageSession = new sessionStorageProxy(sessionStorage);
export const storageLocal = new localStorageProxy(localStorage);
