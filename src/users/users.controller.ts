import { Body, Controller, Post, Get, Patch,Param,Query, Delete,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/userDto';
import { Serialize } from 'src/interceptors/serialize.interceptor';


@Controller('auth')
@Serialize(UserDto) // Serialization for the entire controller
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    return this.service.create(user.email, user.password);
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
