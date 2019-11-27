import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

import { AppDialogComponent } from './app-dialog.component';

// This is a template of how to test MatDialog Component
// Ref: http://angular-tips.com/blog/2018/02/testing-angular-material-dialog-templates/

// Noop component is only a workaround to trigger change detection latter used
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  AppDialogComponent,
  NoopComponent
];

// The first thing we have to notice here is that the AppDialogComponent
// won’t be used directly in a template, in other words, it is a EntryComponent.
// As far as I know, there is no entryComponents array with the TestingModule so
// we need to create a dummy NgModule:

@NgModule({ // Here we import the the needed modules and we register our dialog.
  imports: [MatDialogModule, NoopAnimationsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [
    AppDialogComponent
  ],
})
class DialogTestModule { }


describe('AppDialogComponent', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(async(() => {
    // We create our TestingModule
    TestBed.configureTestingModule({
      imports: [ DialogTestModule ],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
          // Angular Material creates an overlay container to put the dialog in it
          // We create a mock of the container and use it to put our new dialog in it.
          overlayContainerElement = document.createElement('div');
          return { getContainerElement: () => overlayContainerElement };
        }}
      ]
    });

    dialog = TestBed.get(MatDialog);

    // The dialog appears in the div, but has no content on it,
    // we need to perform change detection.

    // Its a workaround to trigger the change detection using other component
    noop = TestBed.createComponent(NoopComponent);
  }));

  // First test
  it('shows information without details', () => {
    const config = {
      data: { }
    };
    const dialogRef: MatDialogRef<AppDialogComponent> = dialog.open(AppDialogComponent, config);
    expect(!!dialogRef.id).toBeTruthy();
    noop.detectChanges(); // Updates the dialog in the overlay

    // We don’t have a way to make assertions normally to the template.
    // We discarded the .createComponent option before
    // We user the "overlayContainerElement" created where the component was loaded
    // const h2 = overlayContainerElement.querySelector('#mat-dialog-title-0');
    // const button = overlayContainerElement.querySelector('button');

    // expect(h2.textContent).toBe('Any text of the title');
    // expect(button.textContent).toBe('Close');
  });
});
