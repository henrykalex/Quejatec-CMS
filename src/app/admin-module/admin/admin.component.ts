import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  navRoutes = [
    { label: 'Inicio', route: ['/admin', 'home'] },
    { label: 'Quejas', route: ['/admin', 'quejas'], childRoutes: [['/admin', 'queja']] },
    { label: 'NetScore', route: ['/admin', 'scores']},
    { label: 'Grupos', route: ['/admin', 'space-groups'], childRoutes: [['/admin', 'space-group']] },
    { label: 'Administradores', route: ['/admin','admins'], childRoutes: [['/admin', 'admin']] },
    { label: 'Usuarios', route: ['/admin','users'], childRoutes: [['/admin', 'user']] },
  ];

  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
