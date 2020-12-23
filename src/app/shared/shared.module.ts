import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModalDirective } from './alert-modal.directive';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { DropDownDirective } from './dropDown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        AlertModalComponent,
        LoadingSpinnerComponent,
        AlertModalDirective,
        DropDownDirective
    ],
    exports: [
        AlertModalComponent,
        LoadingSpinnerComponent,
        AlertModalDirective,
        DropDownDirective,
        CommonModule
    ],
    entryComponents: [AlertModalComponent]
})
export class SharedModule {}