import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { Profile } from './entitys/profile.entidad';
import { Usuario } from './entitys/usuario.entidad';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import {hash,compare} from 'bcryptjs';

@Injectable()
export class UsuariosService {
   
    constructor(
      @InjectRepository(Usuario )
      private readonly userRepository:Repository<Usuario >,
      @InjectRepository(Profile)
      private readonly profileRepository:Repository<Profile>
    ){}

    findAll(){
        return this.userRepository.find({ relations:['profile']});
    }


    async find(username:string, password:string){
      const user= await this.userRepository.findOne({where :{username} , select:['id','username','password','activo','role'], relations:['profile'] });
      if(!user){
        throw new NotFoundException(`El usuario con el user  ${username} no existe`)
      }
  
      const isok=await this.passwordCompare(password,user.password);

      if(!isok){
        throw new NotFoundException(`password incorrecto`)

      }

      return user;
  }

   async findOne(id:number){
        const user= await this.userRepository.findOne({where :{id} , select:['id','username'], relations:['profile'] });
        if(!user){
          throw new NotFoundException(`El usuario con el id ${id} no existe`)
        }
        return user;
    }
  async passwordHash(password:string){
      return hash(password,10);
  } 

  async passwordCompare(passwordPayload:string, passwordDB:string){
    return compare(passwordPayload,passwordDB);
  }

   async create(payload:CreateUsuarioDto){
      const newProfile=new Profile();
        newProfile.name=payload.name;
        newProfile.lastname=payload.lastname;
        newProfile.email=payload.email;
        newProfile.age=payload.age;

        const profileCreated=await this.profileRepository.save(newProfile);

       const newUser=new Usuario ();
        newUser.username=payload.username;
        newUser.password=await this.passwordHash(payload.password);
        newUser.activo=true;
        newUser.profile=profileCreated;
        const usuCreated=await this.userRepository.save(newUser);
        return usuCreated;
      }

   async deleteOne(id:number){
      const users= await this.userRepository.findOne({where :{id},relations:['profile']});
      if(!users){
        throw new NotFoundException(`Usuario con el id ${id} no encontrado`)
      }
    await this.userRepository.delete(id);
    await this.profileRepository.delete(users.profile.id);
    return users;
    }
    
   async update(id:number , payload:UpdateUsuarioDto){
      const users= await this.userRepository.findOne({where :{id}});
        if(!users){
          throw new NotFoundException(`Usuario con el id ${id} no encontrado`)
        }
      users.password=payload.password;
      await this.userRepository.save(users);

      return users;
    }
}

