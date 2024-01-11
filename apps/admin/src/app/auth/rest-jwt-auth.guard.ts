import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RestJwtAuthGuard extends AuthGuard('jwt') {

  // Override canActivate method to call the parent canActivate.
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // Override handleRequest method to customize error handling.
  handleRequest(err: any, user: any) {
    // Check for errors or missing user and throw UnauthorizedException if needed.
    if (err || !user) {
      throw err || new UnauthorizedException('REST API Auth blocked request.');
    }
    // Return the user if authentication is successful.
    return user;
  }
}
