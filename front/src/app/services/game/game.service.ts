import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  newGame() {
    return this.http.post('game/new', {});
  }
  guess(value: number) {
    return this.http.get<{ response: string }>('game/play', {
      params: { value: value.toString() },
    });
  }
}
