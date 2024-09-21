import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'cpfMask'
})
export class CpfMaskPipe implements PipeTransform{

    transform(value: any, ...args: any[]): any {
        let cpf = value.toString();

        if (cpf.length !== 11) {
            return cpf;
        }
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
}
