import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  readonly messages$: Observable<any> = new Observable((subscriber) => {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/live');

    socket.onmessage = (event) => subscriber.next(JSON.parse(event.data));
    socket.onerror = () => subscriber.error(new Error('WebSocket connection failed'));
    socket.onclose = () => subscriber.complete();

    return () => socket.close();
  });
}
