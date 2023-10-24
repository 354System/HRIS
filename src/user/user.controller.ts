import { Body, Controller, Patch, Post, Get, Query, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { User } from 'src/schemas/user.schema';
import { LoginDto } from './dto/login.dto';


@Controller('user')
export class UserController {

    constructor(private userService: UserService,) { }

    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto):Promise<{token:string}> {
        return this.userService.createUser(createUserDto)
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto ):Promise<{token:string}>{
        return this.userService.login(loginDto)
    } 
    
    @Patch('/update/:id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(id, updateUserDto)
    }

    @Get('')
    async getAllUsers(@Query() query: ExpressQuery, @Param('id') id: string): Promise<User[]> {
        return this.userService.findAll(query)
    }

    @Delete(':id')
    async deleteUser(
        @Param('id')
        id: string
    ): Promise<User> {
        return this.userService.deleteById(id);
    }
}
