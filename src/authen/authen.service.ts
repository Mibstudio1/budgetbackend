import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthenDto } from './dto/create-authen.dto';
import { AuthenRepository } from './authen.repository';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-authen.dto';

@Injectable()
export class AuthenService {
  constructor(
    private readonly authenRepo: AuthenRepository,
    private readonly hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async register(createAuthenDto: CreateAuthenDto) {
    const { name, username, password, role } = createAuthenDto;
    const hashedPassword = await this.hashService.hashPassword(password);
    const newObj = {
      name,
      username,
      password: hashedPassword,
      role,
    };
    const payload = { name, role };
    const token = this.jwtService.sign(payload);
    await this.authenRepo.register(newObj);
    return {
      profile: {
        name,
        role,
        token,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const hashedPassword = await this.hashService.hashPassword(password);
    const newObj = {
      username,
      password: hashedPassword,
    };
    const user = await this.authenRepo.login(newObj);
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isPasswordValid = await this.hashService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid username or password');

    const payload = {
      name: user.name,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      profile: {
        name: user.name,
        role: user.role,
        token,
      },
    };
  }
}
