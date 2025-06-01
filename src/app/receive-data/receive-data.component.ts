import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DataTransferService } from '../services/data-transfer.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-receive-data',
  imports: [ButtonModule, TabsModule, FormsModule, CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './receive-data.component.html',
  styleUrl: './receive-data.component.css',
})
export class ReceiveDataComponent {
  receivedData: string = '';
  isLoading: boolean = false;
  dataCode: string = '';
  hasError: boolean = false;
  errorMsg: string = 'Failed to fetch data,pls try again later!!!';
  hasSuccess: boolean = false;
  copyButtonIcon: string = 'pi pi-copy';
  copyButtonLabel: string = 'Copy';
  constructor(
    private readonly dataTransferService: DataTransferService,
    private messageService: MessageService
  ) {}
  receiveData() {
    if (!(this.dataCode?.trim()?.length >= 1)) return;
    this.isLoading = true;
    this.dataTransferService.receiveData(this.dataCode?.trim()).subscribe({
      next: (res: any) => {
        if (Object.keys(res.result).length == 0) {
         // console.log('got no data');
          this.errorMsg = 'No data found for the provided doc-code';
          this.hasError = true;
          this.receivedData = '';
          this.isLoading = false;
          return;
        }
       // console.log(res);
        this.hasSuccess = true;
        this.receivedData = res.result.data;
        this.isLoading = false;
      },
      error: (error: any) => {
       // console.log('error is:', error);
        this.hasError = true;
        this.receivedData = '';
        this.isLoading = false;
      },
    });
  }
  onDataCodeChange(event: any) {
    this.errorMsg = 'Failed to fetch data,pls try again later!!!';
    this.hasError = false;
    this.hasSuccess = false;
    this.receivedData = '';
  }
  copyText() {
    navigator.clipboard
      .writeText(this.receivedData)
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
}
