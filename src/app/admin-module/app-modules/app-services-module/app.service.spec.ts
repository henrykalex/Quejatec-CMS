import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { AppService } from './app.service';

describe('AppService', () => {
  let matDialogSpy: { open: jasmine.Spy };

  beforeEach(() => {
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        AppService // Because it is provided in a module that is not loaded,
                   // we need to provide it in the test bed
      ]
    });
  });

  it('should be created', () => {
    const service: AppService = TestBed.get(AppService);
    const matDialogDepSpy: MatDialog = TestBed.get(MatDialog);

    expect(service).toBeTruthy();
    expect(matDialogDepSpy).toBeTruthy();
  });
});
