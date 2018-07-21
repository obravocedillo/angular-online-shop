import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetosCarritoService {

  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: number) {
      this.messageSource.next(message)
  }
}
