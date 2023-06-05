import { HttpException, Injectable } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class GameService {
  games: Map<string, number> = new Map<string, number>();

  private async validateParams(params: { value: number }) {
    const schema = Joi.object().keys({
      value: Joi.number().required().min(1).max(10000),
    });
    try {
      await schema.validateAsync(params);
    } catch (error) {
      throw new HttpException(error.details[0].message, 400);
    }
  }

  async newGame(username: string) {
    this.games.set(username, Math.floor(Math.random() * 10000 + 1));
  }

  async playGame(username: string, value: number) {
    if (!this.games.has(username)) {
      throw new HttpException('No game started', 400);
    }
    await this.validateParams({ value });

    const game_value = this.games.get(username);

    if (value < game_value) {
      return 'bigger';
    } else if (value > game_value) {
      return 'smaller';
    } else {
      return 'equal';
    }
  }
}
