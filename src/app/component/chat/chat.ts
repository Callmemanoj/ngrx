import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gemini } from '../../services/gemini';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  @Output() chatClose = new EventEmitter<any>();
  chatHistory: any[] = [];
  constructor(private gemini:Gemini) {
    this.gemini.getMessageHistory().subscribe(history => {
      console.log('Received chat history:', history);
      if(history){
        this.chatHistory.push(history);
      }
    });
    console.log(this.chatHistory)
  }

  messageText = '';

  closeChat() {
    this.chatClose.emit('close');
  }

  sendMessage(){
    if(this.messageText.trim() !== ''){
      // Handle sending the message (e.g., call a service)
      this.gemini.generateText(this.messageText).then(response => {
        console.log('Gemini response:', response);
      });
      console.log('Message sent:', this.messageText);
      this.messageText = '';
    }
  }
}


