import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { MessageService } from '../../service/data/message.service';
import { UserInfoService } from 'src/app/service/app/user-info.service';
import { BasicAuthenticationService } from 'src/app/service/app/basic-authentication.service';
import { Message } from '../../app.classes';

@Component({
  selector: 'app-message',
  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() recipientUserName: string = '';
  @Input() showCancelButton: boolean = true;
  @Output() messageSent = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();

  userInfoService: UserInfoService = inject(UserInfoService);
  authenticationService: BasicAuthenticationService = inject(BasicAuthenticationService);

  subject: string = '';
  content: string = '';
  senderEmail: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isSending: boolean = false;

  constructor(private messageService: MessageService) { }

  isFormValid(): boolean {
    return this.recipientUserName.trim().length > 0 &&
      this.subject.trim().length > 0 &&
      this.content.trim().length > 0;
  }

  onSend(): void {
    if (!this.isFormValid()) return;
    this.isSending = true;
    this.errorMessage = '';
    this.successMessage = '';
    const senderId = this.authenticationService.getAuthenticatedUserId();

    if (!senderId) {
      this.errorMessage = 'You must be logged in to send a message.';
      this.isSending = false;
      return;
    }

    const senderName = this.authenticationService.getAuthenticatedUser() ?? '';

    this.userInfoService.getUserIdByUsername(this.recipientUserName).pipe(
      switchMap((recipientId: string) => {
        const message = new Message('', senderName, this.senderEmail, this.subject, this.content, new Date().toISOString(), false, senderId, recipientId);
        return this.messageService.sendMessage(message, senderId, recipientId);
      })
    ).subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully.';
        this.isSending = false;
        this.subject = '';
        this.content = '';
        this.senderEmail = '';
        this.messageSent.emit();
      },
      error: () => {
        this.errorMessage = 'Failed to send message. Please try again.';
        this.isSending = false;
      }
    });
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
