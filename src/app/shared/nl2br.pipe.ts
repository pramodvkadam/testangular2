import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

    private _regexp = new RegExp('(\r\n|\n\r|\n|\r)');

    transform(value: any, args?: any): any {
        return value.replaceAll(this._regexp, '<br>');
    }

}
