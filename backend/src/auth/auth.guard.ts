import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(FirebaseService) private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token is required');
    }

    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await this.firebaseService.verifyToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
