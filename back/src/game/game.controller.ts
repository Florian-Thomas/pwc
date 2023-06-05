import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @UseGuards(AuthGuard)
  @Post('new')
  async newGame(@Request() req) {
    this.gameService.newGame(req.username);
  }

  @UseGuards(AuthGuard)
  @Get('play')
  async playGame(@Request() req, @Query('value') value: number) {
    try {
      return this.gameService.playGame(req.username, value);
    } catch (e) {
      throw e;
    }
  }
}
