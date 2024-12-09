import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackdropService {

  private isDialogOpenSubject = new BehaviorSubject<boolean>(false);
  isDialogOpen$ = this.isDialogOpenSubject.asObservable();

  closeDialog(): void {
    this.setIsDialogOpen(false);
  }

  setIsDialogOpen(value: boolean): void {
    this.isDialogOpenSubject.next(value);
  }

}


