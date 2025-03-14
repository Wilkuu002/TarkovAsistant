import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [FirebaseService],
  controllers: [AuthController],
})
export class AuthModule {}
