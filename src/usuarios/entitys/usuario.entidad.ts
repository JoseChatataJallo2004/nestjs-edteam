import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../constants/user.emun";
import { Profile } from "./profile.entidad";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',unique:true})
    username:string;

    @Column({type:'varchar'})
    password:string;

    @Column({default:false})
    activo:boolean;
    
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @OneToOne(()=>Profile, profile=>profile.user,{
        cascade:true,
        onDelete:'CASCADE',
    })
    @JoinColumn({name:'profile_id'})
    profile:Profile;

    @OneToMany(()=>Comment, comment=>comment.user)
    comments:Comment[];
}