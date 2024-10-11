import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Role } from './constants/user.emun';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {

   constructor(
    private readonly usuarioService:UsuariosService
   ) {}
   
    
    @Get()
    @Roles(Role.USER)
    @UseGuards(AuthGuard)
    getAll(){
      return this.usuarioService.findAll(); 
    }

    @Get(':id')
    getById(@Param('id') id:string){
      return this.usuarioService.findOne(+id);
    }

    @Post()
    async crearUsuario(@Body() body:CreateUsuarioDto){
      return this.usuarioService.create(body);
    }

    @Delete(':id')
    deleteById(@Param('id') id:string){
      return this.usuarioService.deleteOne(+id);
    }

    @Patch(':id')
   async updateUsuario(
      @Param('id',ParseIntPipe) id:number,
        @Body() body:UpdateUsuarioDto){
        return this.usuarioService.update(id,body);
      }
  
}
