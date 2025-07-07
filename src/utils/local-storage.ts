export function setLocalStorageValue<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
}
export function getLocalStorageValue<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

export function removeLocalStorageValue(key: string): void {
    localStorage.removeItem(key);
}
