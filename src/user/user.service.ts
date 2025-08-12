import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from 'src/authen/hash.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepo: UserRepository,
  ) {}
  findAll() {
    return this.userRepo.findAll();
  }

  async update(updateUserDto: UpdateUserDto) {
    const { userId, username, name, password, role } = updateUserDto;
    const hashedPassword = await this.hashService.hashPassword(password);
    const newObj = {
      userId,
      name,
      username,
      password: hashedPassword,
      role,
    };
    await this.userRepo.update(newObj);
    return [];
  }

  remove(userId: string) {
    return this.userRepo.delete(userId);
  }
}
