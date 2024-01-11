import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OperatorEntity } from '@ridy/database/operator.entity';
import { ForbiddenError } from 'apollo-server-fastify';
import { OperatorService } from '../operator/operator.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private adminService: OperatorService) {}

  /**
   * Get details of an admin user by ID.
   * @param id - The ID of the admin user.
   * @returns - Details of the admin user.
   */
  async getAdmin(id: number): Promise<OperatorEntity> {
    return this.adminService.getById(id);
  }

  /**
   * Authenticate an admin user using provided credentials and generate a JWT token.
   * @param args - Object containing userName and password for authentication.
   * @returns - JWT token upon successful authentication.
   * @throws ForbiddenError - If credentials are invalid.
   */
  async loginAdmin(args: { userName: string; password: string }): Promise<string> {
    // Validate admin user credentials.
    const admin = await this.adminService.validateCredentials(args.userName, args.password);

    // Throw ForbiddenError if credentials are invalid.
    if (admin == null) {
      throw new ForbiddenError('Invalid Credentials');
    }

    // Sign and return a JWT token for the authenticated admin user.
    return this.jwtService.sign({ id: admin.id });
  }
}
