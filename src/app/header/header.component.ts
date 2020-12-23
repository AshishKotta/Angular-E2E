import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated= false;
  private usrSub: Subscription;

  constructor(private dataStore: DataStorageService, private authservice: AuthService) {}

  ngOnInit() {
    this.usrSub= this.authservice.user.subscribe(usr => {
      this.isAuthenticated = !usr? false: true;
    });
  }

  onSaveData() {
    this.dataStore.storeRecipes();
  }

  onFetchData() {
    this.dataStore.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.authservice.logout();
  }

  ngOnDestroy() {
    this.usrSub.unsubscribe();
  }

}
