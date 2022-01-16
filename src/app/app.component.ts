import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoryService,
    private storage: Storage,
  ) {}
  ngOnInit(): void {
    this.storage.create();
  }

  ngOnDestroy(): void {
    this.storage.remove('TOKEN');
  }

}
