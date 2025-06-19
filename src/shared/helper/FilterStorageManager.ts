export class FilterStorageManager<T> {
    private readonly key: string;

    constructor(key: string) {
        this.key = key;
    }

    save(filters: T) {
        localStorage.setItem(this.key, JSON.stringify(filters));
    }

    load(): T | null {
        const item  = localStorage.getItem(this.key)
        return item ? JSON.parse(item) as T : null;
    }

    clear(): void {
        localStorage.removeItem(this.key);
    }

    exists(): boolean {
        return localStorage.getItem(this.key) !== null;
    }
}
