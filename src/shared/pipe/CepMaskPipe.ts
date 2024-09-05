import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'cepMask'
})
export class CepMaskPipe implements PipeTransform{

    transform(value: any, ...args: any[]): any {
        let cpf = value.toString();

        // if (cpf.length !== 11) {
        //     return cpf; // Retorna o valor original se não tiver 11 dígitos
        // }
        return cpf.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
    }
}
