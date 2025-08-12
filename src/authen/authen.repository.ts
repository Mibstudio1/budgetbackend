import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthenDto } from './dto/create-authen.dto';
import { LoginDto } from './dto/login-authen.dto';

@Injectable()
export class AuthenRepository {
  constructor(private prisma: PrismaService) {}
  async register({ name, username, password, role }: CreateAuthenDto) {
    await this.prisma.bG_User.create({
      data: {
        name,
        username,
        password,
        role,
      },
    });
  }

  async login({ username }: LoginDto) {
    return this.prisma.bG_User.findUnique({
      where: {
        username,
        isActive: true,
      },
    });
  }
}
