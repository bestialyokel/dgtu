import {Entity, PrimaryGeneratedColumn, Column, In, Index} from "typeorm";

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    phoneNumber: string;

    @Index()
    @Column({
        unique: true,
    })
    emailHash: string;

}
