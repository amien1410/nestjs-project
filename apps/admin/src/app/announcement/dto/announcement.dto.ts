import { Authorize, FilterableField, IDField } from "@nestjs-query/query-graphql";
import { ID, ObjectType } from "@nestjs/graphql";
import { AnnouncementUserType } from "@ridy/database/enums/anouncement-user-type.enum";
import { AnnouncementAuthorizer } from "./announcement.authorizer";

@ObjectType('Announcement')
// Apply authorization using the custom AnnouncementAuthorizer.
@Authorize(AnnouncementAuthorizer)
export class AnnouncementDTO {
    // Auto-generate ID field.
    @IDField(() => ID)
    id!: number;

    // Title of the announcement.
    @FilterableField(() => String)
    title: string;

    // Description of the announcement.
    @FilterableField(() => String)
    description: string;

    // Optional URL related to the announcement.
    @FilterableField(() => String, { nullable: true })
    url?: string;

    // User types for whom the announcement is relevant.
    @FilterableField(() => [AnnouncementUserType])
    userType: AnnouncementUserType[];

    // Start date and time of the announcement.
    @FilterableField(() => Date)
    startAt: Date;

    // Expiry date and time of the announcement.
    @FilterableField(() => Date)
    expireAt: Date;
}
