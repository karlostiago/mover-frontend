export class NumberHelpers {
    static invertSignalWhenNegative(value: number) {
        return value < 0 ? value * -1 : value;
    }

    static currencyBRL(value: number, invertSignal = false) {
        if (invertSignal) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                this.invertSignalWhenNegative(value)
            );
        }
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
}
