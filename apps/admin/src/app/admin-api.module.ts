import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, entities } from '@ridy/database';
import { join } from 'path';
import { existsSync, promises as fs } from 'fs';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import { AdminAPIModule } from './admin-api.controller';
import { AppController } from './admin-api.controller';
import { UploadService } from './upload/upload.service';
import { ConfigurationModule } from './config/configuration.module';
import { validateToken } from './auth/jwt.strategy';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({})
export class AdminAPIModule {
  static async register(): Promise<DynamicModule> {
    try {
      const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV}.json`;
      if (existsSync(configAddress)) {
        const file = await fs.readFile(configAddress, { encoding: 'utf-8' });
        const config = JSON.parse(file);
        const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
        if (config.firebaseProjectPrivateKey != null && existsSync(firebaseKeyFileAddress)) {
          return {
            module: AdminAPIModule,
            imports: [
              DatabaseModule,
              GraphQLModule.forRoot<ApolloDriverConfig>({
                driver: ApolloDriver,
                subscriptions: {
                  'subscriptions-transport-ws': {
                    onConnect: async (connectionParams: { authToken: string }) => {
                      if (connectionParams.authToken) {
                        return validateToken(connectionParams.authToken);
                      }
                      throw new Error('Missing auth token!');
                    },
                    onDisconnect: () => {},
                  },
                },
                autoSchemaFile: join(process.cwd(), 'admin.schema.gql'),
                cors: false,
              }),
              TypeOrmModule.forFeature(entities),
              HttpModule,
              RedisModule.forRoot({
                closeClient: true,
                commonOptions: { db: 2 },
                config: {
                  host: process.env.REDIS_HOST ?? 'localhost',
                },
              }),
              ...modulesToImport(),
            ],
            providers: [UploadService],
            controllers: [AppController],
          };
        }
      }
      // If the config file or Firebase key file is missing, fallback to a basic setup
      return basicSetup();
    } catch (error) {
      console.error('Error during module registration:', error.message);
      throw error;
    }
  }
}

/**
 * Define the basic setup with minimal dependencies.
 */
function basicSetup(): DynamicModule {
  return {
    module: AdminAPIModule,
    imports: [
      HttpModule,
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
        cors: false,
      }),
      ConfigurationModule,
    ],
  };
}

/**
 * Define the modules to be imported in the advanced setup.
 */
function modulesToImport(): any[] {
  return [
    ServiceModule,
    OperatorModule,
    RiderModule,
    DriverModule,
    FleetModule,
    OrderModule,
    AnnouncementModule,
    CouponModule,
    AccountingModule,
    RegionModule,
    PaymentGatewayModule,
    CarModule,
    FeedbackModule,
    AddressModule,
    AuthModule,
    UploadModule,
    SOSModule,
    RewardModule,
    ComplaintModule,
  ];
}
