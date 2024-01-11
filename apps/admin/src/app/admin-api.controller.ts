import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import * as fastify from 'fastify';
import { rm } from 'fs/promises';

import { RestJwtAuthGuard } from './auth/rest-jwt-auth.guard';
import { UploadService } from './upload/upload.service';
import { version } from 'package.json';

@Controller()
export class AppController {
    constructor(private readonly uploadService: UploadService) {}

    /**
     * Default route to check if the Admin API microservice is running.
     */
    @Get()
    async defaultPath(@Res() res: fastify.FastifyReply) {
        try {
            res.send(`✅ Admin API microservice running.\nVersion: ${version}`);
        } catch (error) {
            this.handleServerError(res, error);
        }
    }

    /**
     * Upload route for media files, protected by JWT authentication.
     */
    @Post('upload')
    @UseGuards(RestJwtAuthGuard)
    async upload(@Req() req: fastify.FastifyRequest, @Res() res: fastify.FastifyReply) {
        try {
            await this.uploadService.uploadMedia(req, res, 'uploads', new Date().getTime().toString());
        } catch (error) {
            this.handleServerError(res, error);
        }
    }

    /**
     * Endpoint to reconfigure the application by removing the config file and restarting the process.
     */
    @Get('reconfig')
    async reconfig(@Req() req: fastify.FastifyRequest, @Res() res: fastify.FastifyReply) {
        try {
            const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV}.json`;
            await rm(configAddress);
            process.exit(1);
        } catch (error) {
            this.handleServerError(res, error);
        }
    }

    /**
     * Handles server errors by sending an internal server error response.
     * @param res - Fastify reply object.
     * @param error - The caught error.
     */
    private handleServerError(res: fastify.FastifyReply, error: Error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
