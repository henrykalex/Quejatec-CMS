import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const QR_API_URL_BASE = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=';

@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.component.html',
  styleUrls: ['./qrgenerator.component.scss']
})
export class QRGeneratorComponent implements OnInit {
  qrControl: FormControl = new FormControl('', [Validators.required]);
  qrImage: string = QR_API_URL_BASE + 'example';

  constructor() { }

  ngOnInit() {
  }

  loadQRCode() {
    this.qrImage = QR_API_URL_BASE + this.qrControl.value;
  }

}
