import { Categoria } from "src/categorias/entities/categoria.entity";
import { Usuario } from "src/usuarios/entitys/usuario.entidad";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar',nullable:false})
    comment:string;
    
    @ManyToOne(()=>Usuario, user=>user.comments)
    @JoinColumn({name:'user_id'})
    user:Usuario;

    @ManyToMany(()=>Categoria, categoria=>categoria.comments)
    @JoinTable({name:'comment_category'})
    categories:Categoria[];
}
