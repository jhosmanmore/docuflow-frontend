import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {
  @Input() title: string = 'Información de Demostración';
  @Input() message: string = '';
  @Input() showModal: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  onClose(): void {
    this.showModal = false;
    this.closeModal.emit();
  }
}
