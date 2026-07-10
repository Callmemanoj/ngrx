import { Injectable, NgZone } from '@angular/core';
import { GoogleGenerativeAI, FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCartItems, selectCartTotal } from '../store/cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class Gemini {
  private generativeAI!: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject({
    from: 'gemini',
    message: 'Hello! How can I assist you today?'
  });

  private tools: FunctionDeclaration[] = [
    {
      name: 'getCartItems',
      description: "Returns items currently in the user's shopping cart with name, price, and quantity.",
      parameters: { type: SchemaType.OBJECT, properties: {} }
    },
    {
      name: 'getCartTotal',
      description: 'Returns the total price of all items in the shopping cart.',
      parameters: { type: SchemaType.OBJECT, properties: {} }
    }
  ];

  constructor(private store: Store<AppState>, private ngZone: NgZone) {
    this.generativeAI = new GoogleGenerativeAI('AIzaSyCvoH5fxxcS6MaI6O7iFenyqgblAnUG_PE');
  }

  private async runTool(name: string): Promise<any> {
    switch (name) {
      case 'getCartItems':
        return { items: await firstValueFrom(this.store.select(selectCartItems)) };
      case 'getCartTotal':
        return { total: await firstValueFrom(this.store.select(selectCartTotal)) };
      default:
        return { error: `Unknown tool: ${name}` };
    }
  }

  async generateText(prompt: string): Promise<string> {
    this.messageHistory.next({ from: 'user', message: prompt });

    const model = this.generativeAI.getGenerativeModel({
      model: 'models/gemini-3.1-flash-lite',
      tools: [{ functionDeclarations: this.tools }]
    });

    const chat = model.startChat();
    let result = await chat.sendMessage(prompt);

    while (true) {
      const calls = result.response.functionCalls();
      if (!calls || calls.length === 0) break;

      const responses = await Promise.all(
        calls.map(async call => ({
          functionResponse: {
            name: call.name,
            response: await this.runTool(call.name)
          }
        }))
      );

      result = await chat.sendMessage(responses);
    }

    const text = result.response.text();
    this.ngZone.run(() => this.messageHistory.next({ from: 'gemini', message: text }));
    return text;
  }

  public getMessageHistory() {
    return this.messageHistory.asObservable();
  }
}
