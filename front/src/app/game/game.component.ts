import { Component, HostListener } from '@angular/core';
import { GameService } from '../services/game/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  value = null;
  msg: any = null;

  constructor(private gameService: GameService) {
    this.gameService.newGame().subscribe();
  }
  startGame() {
    this.gameService.newGame().subscribe();
  }
  playAgain() {
    this.gameService.newGame().subscribe();
    this.msg = null;
  }

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.guess(this.value);
  }
  guess(value: number | null) {
    if (value != null) {
      this.gameService.guess(value).subscribe({
        next: (res) => {
          this.msg = res.response;
          this.value = null;
        },
        error: (err) => (this.msg = 'Please provide values betwen 1 and 10000'),
      });
    }
  }
}
