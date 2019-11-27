import { Injectable } from '@angular/core';
function _window(): any {
   return window;
}
@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor() { }
  get nativeWindow(): Window {
      return _window();
   }
}
