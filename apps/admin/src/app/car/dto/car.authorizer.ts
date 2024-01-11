import { Filter } from "@nestjs-query/core";
import { CustomAuthorizer, AuthorizationContext } from "@nestjs-query/query-graphql";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { OperatorPermission } from "@ridy/database/enums/operator-permission.enum";
import { OperatorEntity } from "@ridy/database/operator.entity";
import { getRepository } from "typeorm";
import { UserContext } from "../../auth/authenticated-admin";

@Injectable()
export class CarAuthorizer implements CustomAuthorizer<any> {
    // Authorize the Car operations based on user permissions
    async authorize(context: UserContext, authorizerContext: AuthorizationContext): Promise<Filter<any>> {
        // Retrieve operator information from the database
        const operator = await getRepository(OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });

        // Check if the operator has permission to view cars
        if (authorizerContext.readonly && !operator.role.permissions.includes(OperatorPermission.Cars_View)) {
            throw new UnauthorizedException();
        }

        // Check if the operator has permission to edit cars
        if (!authorizerContext.readonly && !operator.role.permissions.includes(OperatorPermission.Cars_Edit)) {
            // Throw an exception if the operation is creating or updating a car
            if (authorizerContext.operationName === 'updateOne' || authorizerContext.operationName === 'createOne') {
                throw new UnauthorizedException();
            }
        }

        // Return undefined to allow the operation
        return undefined;
    }
}
