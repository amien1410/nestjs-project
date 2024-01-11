import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OperatorModule } from '../operator/operator.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    // Import required modules for authentication.
    imports: [
        OperatorModule, // Importing the OperatorModule to access operator-related functionality.
        PassportModule, // Importing PassportModule for authentication support.
        JwtModule.register({ // Configuring JwtModule with a secret key for token signing and verification.
            secret: 'secret', // Replace 'secret' with a strong and secure secret key. Consider using environment variables.
        }),
    ],
    // Declare providers (services, resolvers, and strategies) for the AuthModule.
    providers: [
        JwtStrategy, // JwtStrategy for handling JWT-based authentication.
        AuthService, // AuthService for providing authentication-related services.
        AuthResolver, // AuthResolver for handling authentication-related GraphQL queries and mutations.
    ],
})
export class AuthModule { } // Exporting the AuthModule class.
