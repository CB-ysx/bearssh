import Vue from 'vue';

class Storage {
    constructor(prefix = '') {
        this.prefix = prefix;
    }

    generateKey(key) {
        return `v${this.prefix}:${key}`.toUpperCase();
    }

    save(key, value = '') {
        try {
            let saveValue;
            try {
                saveValue = JSON.stringify(value);
            } catch(e) {
                saveValue = value;
            }
            window.localStorage.setItem(this.generateKey(key), saveValue);
        } catch(e) {
            console.log(e);
            console.log('存储数据失败', key, value);
        }
    }

    load(key, defaultValue = '') {
        let value = window.localStorage.getItem(this.generateKey(key));
        if (value === null) {
            return defaultValue;
        }
        try {
            value = JSON.parse(value);
        } catch(e) {
            console.log(e);
            value = defaultValue;
        }
        return value;
    }

    remove(key) {
        window.localStorage.removeItem(this.generateKey(key));
    }
}

const storage = new Storage(process.env.VUE_APP_STORAGE_PREFIX);

Vue.$storage = Vue.prototype.$storage = storage;

export {
    storage
};