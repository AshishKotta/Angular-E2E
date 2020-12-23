import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertModalDirective } from '../shared/alert-modal.directive';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLoginMode = false;
  isLoading = false;
  error: string = null;
  @ViewChild(AlertModalDirective, {static: false}) alertHost: AlertModalDirective;
  private closeSub : Subscription;

  constructor(private authService : AuthService, private router: Router,
    private compFactResolver : ComponentFactoryResolver) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onUserAuthenticate(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const pwd = form.value.pwd;

    let obs: Observable<AuthResponseData>;

    this.isLoading=true;
    if (this.isLoginMode) {
      obs= this.authService.loginUser(email, pwd);
    }
    else {
    obs = this.authService.signup(email, pwd);
  }

    obs.subscribe(res => {
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    },
    err => {
      this.isLoading=false;
      this.error=err;
      this.showErrorAlert(this.error);
      console.log(err);
    });

    form.reset();
  }

  modalHandle() {
    this.error=null;
  }

  private showErrorAlert(message: string) {
    const alertCompFactory= this.compFactResolver.resolveComponentFactory(AlertModalComponent);
    const hostContainerRef = this.alertHost.containerRef;
    hostContainerRef.clear();
    const compRef= hostContainerRef.createComponent(alertCompFactory);

    compRef.instance.message = message;
    this.closeSub=compRef.instance.closeModal.subscribe(() => {
      this.closeSub.unsubscribe();
      hostContainerRef.clear();
    })
  }

  ngOnDestroy() {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
