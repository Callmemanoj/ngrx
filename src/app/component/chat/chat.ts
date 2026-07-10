import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, signal } from '@angular/core';
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
  chatHistory = signal<any[]>([]);
  constructor(private gemini:Gemini) {
    this.gemini.getMessageHistory().subscribe(history => {
      console.log('Received chat history:', history);
      if(history){
        this.chatHistory.update(h => [...h, history]);
      }
    });
  }

  messageText = '';

  closeChat() {
    this.chatClose.emit('close');
  }

  sendMessage(event?: Event){
    event?.preventDefault();
    if(this.messageText.trim() !== ''){
      this.gemini.generateText(this.messageText).then(response => {
        console.log('Gemini response:', response);
      });
      this.messageText = '';
    }
  }
}


