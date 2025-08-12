import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async update({ userId, name, username, password, role }: UpdateUserDto) {
    await this.prisma.bG_User.update({
      where: {
        id: userId,
      },
      data: {
        name,
        username,
        password,
        role,
      },
    });
  }

  findAll() {
    return this.prisma.bG_User.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });
  }

  async delete(userId: string) {
    await this.prisma.bG_User.delete({
      where: {
        id: userId,
      },
    });
  }
}
