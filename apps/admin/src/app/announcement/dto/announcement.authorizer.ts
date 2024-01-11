import { Filter } from "@nestjs-query/core";
import { CustomAuthorizer, AuthorizationContext } from "@nestjs-query/query-graphql";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { OperatorPermission } from "@ridy/database/enums/operator-permission.enum";
import { OperatorEntity } from "@ridy/database/operator.entity";
import { getRepository } from "typeorm";
import { UserContext } from "../../auth/authenticated-admin";

@Injectable()
export class AnnouncementAuthorizer implements CustomAuthorizer<any> {
    /**
     * Authorize the user to view or edit announcements based on their permissions.
     * @param context The authenticated user context.
     * @param authorizerContext The authorization context for viewing or editing.
     * @returns Returns undefined if authorized; otherwise, throws UnauthorizedException.
     */
    async authorize(context: UserContext, authorizerContext: AuthorizationContext): Promise<Filter<any>> {
        // Fetch the operator details including their role and permissions.
        const operator = await getRepository(OperatorEntity).findOne(context.req.user.id, { relations: ['role'] });

        // Check for unauthorized view access.
        if (this.isUnauthorizedView(operator, authorizerContext)) {
            throw new UnauthorizedException('Insufficient permissions to view announcements');
        }

        // Check for unauthorized edit access.
        if (this.isUnauthorizedEdit(operator, authorizerContext)) {
            throw new UnauthorizedException('Insufficient permissions to edit announcements');
        }

        // Return undefined if authorized.
        return undefined;
    }

    /**
     * Check if the operator is unauthorized to view announcements.
     * @param operator The operator entity with role and permissions.
     * @param authorizerContext The authorization context for viewing.
     * @returns Returns true if unauthorized; otherwise, false.
     */
    private isUnauthorizedView(operator: OperatorEntity, authorizerContext: AuthorizationContext): boolean {
        return authorizerContext.readonly && !operator.hasPermission(OperatorPermission.Announcements_View);
    }

    /**
     * Check if the operator is unauthorized to edit announcements.
     * @param operator The operator entity with role and permissions.
     * @param authorizerContext The authorization context for editing.
     * @returns Returns true if unauthorized; otherwise, false.
     */
    private isUnauthorizedEdit(operator: OperatorEntity, authorizerContext: AuthorizationContext): boolean {
        return !authorizerContext.readonly && !operator.hasPermission(OperatorPermission.Announcements_Edit);
    }
}
