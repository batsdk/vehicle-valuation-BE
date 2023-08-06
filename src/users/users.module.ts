import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [TypeOrmModule.forFeature([User])], // Connecting User Entity w/ the user module
})
export class UsersModule implements NestModule {
  // Using Gloabal Middlewares
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
