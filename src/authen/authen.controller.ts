import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthenService } from './authen.service';
import { CreateAuthenDto } from './dto/create-authen.dto';
import { Public } from '../common/decorators/public.decorator';
import { LoginDto } from './dto/login-authen.dto';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Public()
  @Post('register')
  register(@Body() createAuthenDto: CreateAuthenDto) {
    return this.authenService.register(createAuthenDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authenService.login(loginDto);
  }
}
