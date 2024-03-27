import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separateString'
})
export class SeparateStringPipe implements PipeTransform {

  transform(input: number | string, sep = ','): string {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  }
}
