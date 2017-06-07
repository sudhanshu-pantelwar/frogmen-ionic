import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
@Injectable()
export class ReversePipe {
  transform(value) {
    return value.slice().reverse();
  }
}