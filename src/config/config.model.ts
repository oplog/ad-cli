
export interface Config {
    paths: {
        components: { [key: string]: string };
        store: string;
        containers: string;
        tests: string;
    };
}
