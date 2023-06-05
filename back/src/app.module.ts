import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
    }),
    AuthModule,
    GameModule,
  ],
})
export class AppModule {}
