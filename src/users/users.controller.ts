import { Body, Controller, Post, Get, Patch,Param,Query, Delete,NotFoundException, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/userDto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto) // Serialization for the entire controller
export class UsersController {
  constructor(private service: UsersService, private authService : AuthService) {}

  @Post('/signout')
  signOut(@Session() session: any){
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto, @Session() session :any) {
    const savedUser = await this.authService.signup(user.email, user.password);
    session.userId = savedUser.id;
    return savedUser;
  }

  @Post("/signin")
  async signIn(@Body() user : CreateUserDto, @Session() session :any) {
    const savedUser = await this.authService.signin(user.email, user.password);
    session.userId = savedUser.id;
    return savedUser;
  }

  // Says use SerializeInterceptor middleware/interceptor for this endpoint
  // We pass the Dto we need to be returned as the body
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto) // This is same as the above code, but we shorten it using custom Decorators
  // Now we just have to pass the Dto we want as the body of the response to the @Serialze()
  @Get("/:id")
  async findUser(@Param('id') id:string){
    console.log("Handler is running..");
    const user = await this.service.findOne(parseInt(id))
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string){
    return this.service.find(email);
  }

  @Delete("/:id")
  deleteUser(@Param('id') id: string){
    return this.service.remove(parseInt(id));
  }

  @Patch("/:id")
  updateUser(@Param('id') id: string, @Body() user : UpdateUserDto){
    return this.service.update(parseInt(id),user);
  }

}
