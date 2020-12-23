import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouting } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    imports: [FormsModule, ShoppingListRouting, SharedModule],
    declarations: [
        ShoppingListComponent,
    ShoppingEditComponent
    ]
})
export class ShoppingListModule {

}