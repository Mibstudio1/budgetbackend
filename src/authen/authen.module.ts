import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenController } from './authen.controller';
import { HashService } from './hash.service';
import { AuthenRepository } from './authen.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthenController],
  providers: [
    AuthenService,
    HashService,
    AuthenRepository,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthenModule {}
