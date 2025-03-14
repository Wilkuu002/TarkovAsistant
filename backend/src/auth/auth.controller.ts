import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse,ApiBody  } from '@nestjs/swagger';
import { FirebaseService } from './firebase.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in with Firebase ID token' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully' })
  @ApiResponse({ status: 401, description: 'Invalid token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const token = await this.firebaseService.loginUser(email, password);
      return { message: 'Login successful', token };
    } catch (error) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user with email and password' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Failed to register user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'password123' },
      },
      required: ['email', 'password'],
    },
  })
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    try {
      const userRecord = await this.firebaseService.createUser(email, password);
      return { message: 'User registered successfully', uid: userRecord.uid };
    } catch (error) {
      throw new UnauthorizedException('Failed to register user');
    }
  }



  @Post('reset-password')
  @ApiOperation({summary:'Send password reset link to user email'})
  @ApiResponse({status:200,description:"Password link was sent with succes"})
  @ApiResponse({status:400,description:'Faild to send mail with link to restart password'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
      },
      required: ['email'],
    },
  })
  async resetPassword(@Body() body:{email:string}){
    const {email} = body
    try{
      const resetLink = await this.firebaseService.resetPassword(email)
      return {message:'Link to reset password was sent with succes', resetLink}
    }catch(error){
      throw new UnauthorizedException('Faild to send reset link for password')
    }
  }
}
