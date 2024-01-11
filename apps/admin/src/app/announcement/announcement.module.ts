import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { AnnouncementEntity } from "@ridy/database/announcement.entity";
import { AnnouncementDTO } from './dto/announcement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([AnnouncementEntity])],
            resolvers: [
                {
                    EntityClass: AnnouncementEntity,
                    DTOClass: AnnouncementDTO,
                    // Consider using singular names for the create, update, and delete properties
                    create: { one: { disabled: true } },
                    update: { one: { disabled: true } },
                    delete: { one: { disabled: true } },
                    // Consider using the same strategy for all CRUD operations, whether 'one' or 'many'
                    // If 'many' is applicable, update the DTO and Entity accordingly
                    pagingStrategy: PagingStrategies.OFFSET,
                    enableTotalCount: true,
                    guards: [JwtAuthGuard],
                },
            ],
        }),
    ],
})
export class AnnouncementModule {}
