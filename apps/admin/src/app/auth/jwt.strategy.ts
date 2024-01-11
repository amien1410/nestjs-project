import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  // Constructor to initialize the JwtStrategy with configuration.
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret'
    });
  }

  // Validate method to handle the validation of the payload extracted from the JWT.
  async validate(payload: AuthenticatedUser): Promise<AuthenticatedUser> {
    // Simply return the payload for now, as no additional validation is implemented.
    return payload;
  }
}

// Define the shape of the AuthenticatedUser payload.
export type AuthenticatedUser = { id: number };

// Function to validate and decode the token, extracting the user id.
export async function validateToken(token: string): Promise<Record<string, unknown>> {
  // Decode the token using jwt-decode library.
  const decodedToken: any = jwt_decode(token);

  // Return the user id extracted from the decoded token.
  return {
    id: decodedToken.id
  };
}
