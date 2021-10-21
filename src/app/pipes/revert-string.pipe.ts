import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revertString',
})
export class RevertStringPipe implements PipeTransform {
  transform(value: string): string {
    const word = value;
    const splitString = word.split('');
    const reverseArr = splitString.reverse();

    const joinArr = reverseArr.join('');

    return joinArr;
  }
}
