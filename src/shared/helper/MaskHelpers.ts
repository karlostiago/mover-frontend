export class MaskHelpers {
    static maskTelephone(value: string) {
        if (!value) {
            return '';
        }
        if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        return value;
    }

    static maskCep(value: string) {
        if (!value) {
            return '';
        }
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2-$3');
        return value;
    }

    static maskCpf(value: string) {
        if (!value) {
            return '';
        }
        value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return value;
    }
}
