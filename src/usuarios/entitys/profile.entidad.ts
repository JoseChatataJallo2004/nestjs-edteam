import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario  } from "./usuario.entidad";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    name:string;

    
    @Column({nullable:true})
    lastname:string;

    @Column({type:'varchar'})
    email:string;

    @Column()
    age:number;

    @OneToOne(()=>Usuario , user=>user.profile)
    user:Usuario ;
}