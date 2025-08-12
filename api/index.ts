import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ResponseInterceptor } from '../src/common/interceptors/respone.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../src/common/guards/jwt-auth.guard';

let app: any;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api');
    app.enableCors();
    const reflector = app.get('Reflector');
    app.useGlobalGuards(new JwtAuthGuard(reflector));
    
    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  const expressApp = app.getHttpAdapter().getInstance();
  
  return new Promise((resolve, reject) => {
    expressApp(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
