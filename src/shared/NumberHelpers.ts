export class NumberHelpers {
    static invertSignalWhenNegative(value: number) {
        return value < 0 ? value * -1 : value;
    }
}
