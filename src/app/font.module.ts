import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faSearch
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  exports: [
    FontAwesomeModule
  ]
})
export class FontModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSearch
    );
  }
}
