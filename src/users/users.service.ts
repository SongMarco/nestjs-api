import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { comparePassword, hashPassword } from './users.utils';
import { generateUserToken } from '../utils/token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async create(createUserDto: Partial<User>) {
    console.log('-> createUserDto', createUserDto);
    const { loginId: userName, password } = createUserDto;

    const hashedPassword = await hashPassword(password);
    console.log('-> hashedPassword', hashedPassword);

    const newUser: User = this.usersRepository.create({
      loginId: userName,
      password: hashedPassword,
    });
    console.log('-> newUser', newUser);

    return this.usersRepository.save(newUser);
  }

  async login({ loginId, password }: { loginId: string; password: string }) {
    const currentUser = await this.usersRepository.findOne({
      where: {
        loginId,
      },
    });
    console.log('-> currentUser', currentUser);

    const wrongLoginMessage = 'Wrong ID or Password'
    if (!currentUser)
      throw new HttpException(
          wrongLoginMessage,
        HttpStatus.UNAUTHORIZED,
      );

    const isPasswordCorrect = await comparePassword(password, currentUser?.password);
    console.log('-> isPasswordCorrect', isPasswordCorrect);

    if (!isPasswordCorrect)
      throw new HttpException(
          wrongLoginMessage,
        HttpStatus.UNAUTHORIZED,
      );

    const tokenSecret = this.config.get('TOKEN_SECRET');
    console.log('-> tokenSecret', tokenSecret);
    const accessToken = generateUserToken({ id: currentUser.id }, tokenSecret);

    return accessToken;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(loginId: string) {
    return this.usersRepository.findOne({
      where: {
        loginId,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}