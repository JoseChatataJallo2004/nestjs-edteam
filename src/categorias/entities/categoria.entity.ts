import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar', nullable:false, unique:true})
    name:string;
    
    @ManyToMany(()=>Comment, comment=>comment.categories)
    comments:Comment[];
}
