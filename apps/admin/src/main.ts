import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminAPIModule } from './app/admin-api.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from "@fastify/cors";
import { join } from 'path';

async function bootstrap() {
  // Create a FastifyAdapter
  const adapter = new FastifyAdapter();

  // Create a NestJS application instance
  const app = await NestFactory.create<NestFastifyApplication>(
    AdminAPIModule.register(),
    adapter
  );

  // Define the port for the application to listen on
  const port = process.env.ADMIN_API_PORT || 3000;

  // Enable graceful shutdown hooks
  app.enableShutdownHooks();

  // Register Fastify middleware
  app.register(fastifyCors); // Enable CORS
  app.register(fastifyMultipart); // Enable multipart form handling

  // Serve static files (uploads) at /uploads route
  app.register(fastifyStatic, {
    prefix: '/uploads/',
    root: join(process.cwd(), 'uploads'),
  });

  // Start listening for incoming connections
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:${port}`, 'Admin API');
  });
}

// Bootstrap the application
bootstrap();
