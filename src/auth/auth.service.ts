import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService:JwtService,
    private readonly usuService:UsuariosService,
  ){}
  
 async login(payload: AuthDto) {
    const {username,password}=payload;
    const user=await this.usuService.find(username,password);
      const body={id:user.id, username:user.username,activo:user.activo, role:user.role};
    return {
      access_token:await this.jwtService.signAsync(body),
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }



  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
