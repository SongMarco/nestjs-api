import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() create(@Body() createUserDto: Partial<User>) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard) @Get('profile') getProfile(@Request() req) {
    console.log('UsersController.getProfile -> req.user', req.user);

    return req.user;
  }

  @Get() findAll() {
    return this.usersService.findAll();
  }

  @Get(':id') findOne(@Param('loginId') loginId: string) {
    return this.usersService.findOne(loginId);
  }

  @Patch(':id') update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id') remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
