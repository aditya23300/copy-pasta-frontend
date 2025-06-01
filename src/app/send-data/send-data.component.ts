import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataTransferService } from '../services/data-transfer.service';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-send-data',
  templateUrl: './send-data.component.html',
  styleUrls: ['./send-data.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonModule, ToastModule, RippleModule],
  providers: [MessageService],
})
export class SendDataComponent {
  inputText: string = '';
  currentCode: string = 'N.A';
  isLoading: boolean = false;
  hasError: boolean = false;
  errorMsg: string = 'Failed to send data,pls try again later!!!';
  hasSuccess: boolean = false;
  copyButtonIcon: string = 'pi pi-copy';
  copyButtonLabel: string = 'Copy';
  constructor(
    private readonly dataTransferService: DataTransferService // private messageService: MessageService
  ) {}
  sendData() {
    if (!(this.inputText?.trim()?.length >= 1)) return;
    this.isLoading = true;
    const payload = { data: this.inputText.trim() };
    this.dataTransferService.sendData(payload).subscribe({
      next: (res: any) => {
      //  console.log(res);
        this.hasSuccess = true;
        this.currentCode = res.result.docID;
        this.isLoading = false;
      },
      error: (error: any) => {
        //console.log('error is:', error);
        this.currentCode = 'N.A';
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }
  onTextChange(event: any) {
    this.hasError = false;
    this.hasSuccess = false;
    this.currentCode = 'N.A';
  }
  copyText() {
    navigator.clipboard
      .writeText(this.currentCode)
      .then(() => {
       // console.log('Text copied to clipboard!');
        this.copyButtonLabel = 'Copied!';
        this.copyButtonIcon = 'pi pi-check';
        setTimeout(() => {
          this.copyButtonLabel = 'Copy';
          this.copyButtonIcon = 'pi pi-copy';
        }, 2000);
      })
      .catch((err) => {
       // console.error('Failed to copy text: ', err);
      });
  }
  // showBottomLeft() {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'Warn Message',
  //     detail: 'Message Content',
  //     key: 'bl',
  //     life: 3000,
  //   });
  // }
}
