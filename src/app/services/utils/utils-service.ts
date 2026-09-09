import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  convertISOtoLocaleDateString(isoString: string) {return new Date(isoString).toLocaleDateString();}
}
