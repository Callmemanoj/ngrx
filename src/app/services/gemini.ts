import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Gemini {
  private generativeAI!: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject({
    from: 'gemini',
    message: 'Hello! How can I assist you today?'
  });
  constructor() {
    this.generativeAI = new GoogleGenerativeAI('AIzaSyCvoH5fxxcS6MaI6O7iFenyqgblAnUG_PE');
  }


  async generateText(prompt: string): Promise<string>{
    this.messageHistory.next({
      from: 'user',
      message: prompt,
    });
    const model = this.generativeAI.getGenerativeModel({model: "models/gemini-2.5-flash"});
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const text = response.text();
    this.messageHistory.next({
      from: 'gemini',
      message: text,
    });
    return text;
  }


  public getMessageHistory() {
    return this.messageHistory.asObservable();
  }
}
