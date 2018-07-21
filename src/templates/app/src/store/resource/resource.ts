
export interface Resource<T> {
    error?: Error;
    isBusy: boolean;
    data: T;
}