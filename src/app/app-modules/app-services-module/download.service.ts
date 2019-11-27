import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  isChrome: boolean;
  isSafari: boolean;
  window: Window;

  constructor(
    private windowRefService: WindowRefService
  ) {
    this.window = this.windowRefService.nativeWindow;
    this.isChrome = this.window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    this.isSafari = this.window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  }

  download(sUrl: string){
    console.log("download",sUrl);
    //iOS devices do not support downloading. We have to inform user about this.
    if (/(iP)/g.test(this.window.navigator.userAgent)) {
      //alert('Your device does not support files downloading. Please try again in desktop browser.');
      this.window.open(sUrl, '_blank');
      return false;
    }

    //If in Chrome or Safari - download via virtual link click
    if (this.isChrome || this.isSafari) {
      //Creating new link node.
      var link = this.window.document.createElement('a');
      link.href = sUrl;
      link.setAttribute('target','_blank');

      if (link.download !== undefined) {
        //Set HTML5 download attribute. This will prevent file from opening if supported.
        var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
        link.download = fileName;
      }

      //Dispatching click event.
      if (this.window.document.createEvent) {
        var e = this.window.document.createEvent('MouseEvents');
        e.initEvent('click', true, true);
        link.dispatchEvent(e);
        return true;
      }
    }

    // Force file download (whether supported by server).
    if (sUrl.indexOf('?') === -1) {
      sUrl += '?download';
    }

    this.window.open(sUrl, '_blank');
    return true;
  }
}
