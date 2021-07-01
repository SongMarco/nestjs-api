import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  /**
   * user authentication
   * @see {LocalStrategy.validate}
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('AppController.login -> req', req.user);

    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard) @Get('profile') getProfile(@Request() req) {
  //   console.log('AppController.JwtAuthGuard.login -> req', req.user);
  //
  //   return req.user;
  // }
}