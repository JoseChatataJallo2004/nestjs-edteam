import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entitys/profile.entidad';
import { Usuario } from './entitys/usuario.entidad';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
@Module({
  imports:[TypeOrmModule.forFeature([Usuario ,Profile])],
  controllers: [UsuariosController],
  providers: [UsuariosService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [TypeOrmModule, UsuariosService]
})
export class UsuariosModule {}
