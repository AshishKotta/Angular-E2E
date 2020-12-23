import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  constructor() { }

  @Input() message: string;
  @Output() closeModal = new EventEmitter<void>();

  ngOnInit(): void {
  }

  onModalClose() {
    this.closeModal.emit();
  }

}
