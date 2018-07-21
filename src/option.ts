
export class Option {
    constructor(
        public short: string,
        public long: string,
        public description?: string,
        public defaultValue?: any,
    ) { }
}
