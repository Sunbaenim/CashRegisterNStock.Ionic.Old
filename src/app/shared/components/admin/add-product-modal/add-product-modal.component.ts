import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss'],
})
export class AddProductModalComponent implements OnInit {

  @Input() openModal: boolean;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.openModal = false;
    this.closeModalEvent.emit(false);
  }

}
