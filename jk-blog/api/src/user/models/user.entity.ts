import { BlogEntryEntity } from 'src/blog/model/blog-entry.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole{
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',
    EDITOR = 'editor',
    USER = 'user'
}

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: UserRole, default: UserRole.USER})
    role: UserRole;

    // @Column({nullable: true})
    // profileImage: string;

    // @OneToMany(type => BlogEntryEntity, blogEntryEntity => blogEntryEntity.author)
    // blogEntries: BlogEntryEntity[];


    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}