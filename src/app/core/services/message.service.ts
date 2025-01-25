import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = 'https://localhost:7012/api';

  constructor(private http: HttpClient) {}

  getMessage(): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/Message`);
  }

  updateMessage(formData: FormData): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/Message/update-message`, formData);
  }
}