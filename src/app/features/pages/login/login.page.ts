import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { ToastService } from './../../../core/services/toast.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    if(this.loginFormGroup.valid) {
      this.authService.login(this.loginFormGroup.value).subscribe({
        next: async (data) => {
          await this.storage.set('TOKEN', data.token);
          this.toastService.presentToast('Welcome');
          await this.router.navigateByUrl('catalog');
        },
        error: (her) => {
          this.toastService.presentToastError(her.error);
        }
      });
    }
  }

}
