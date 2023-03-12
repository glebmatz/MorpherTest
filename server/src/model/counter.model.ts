import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Counter {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column("integer", {  default: 0, nullable: false })
    counter: number | undefined;
}
