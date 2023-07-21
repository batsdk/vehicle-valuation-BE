import { Body, Controller, Post, Get, Patch,Param,Query, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('/signup')
  createUser(@Body() user: CreateUserDto) {
    return this.service.create(user.email, user.password);
  }

  @Get("/:id")
  findUser(@Param('id') id:string){
    return this.service.findOne(parseInt(id))
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
