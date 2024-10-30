import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import {
  SohoPersonalizeDirective,
  SohoRenderLoopService,
  SohoApplicationMenuComponent,
} from 'ids-enterprise-ng';

@Component({
  selector: 'body', // tslint:disable-line
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  /**
   * Local Storage Key
   */
  private static IS_APPLICATION_MENU_OPEN_KEY = 'is-application-menu-open';

  @ViewChild(SohoApplicationMenuComponent, { static: true })
  public applicationMenu!: SohoApplicationMenuComponent;

  @ViewChild(SohoPersonalizeDirective, { static: true })
  personalize!: SohoPersonalizeDirective;

  @HostBinding('class.no-scroll') get isNoScroll() {
    return true;
  }

  /**
   * Include the uplift icons only if required by the current theme, this
   * is not quite perfect, as we need to listen for the theme change here.
   * Maybe wrap all the icons into their own component?
   */
  public useNewIcons = true;

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor(private readonly renderLoop: SohoRenderLoopService) {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  ngAfterViewInit(): void {
    (Soho as any).personalization.setTheme('theme-new-light');
  }

  onChangeTheme(ev: SohoPersonalizeEvent) {
    this.useNewIcons =
      ev.data.theme === 'theme-new-light' ||
      ev.data.theme === 'theme-new-dark' ||
      ev.data.theme === 'theme-new-contrast';
  }
}
