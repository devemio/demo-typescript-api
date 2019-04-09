import { IsDefined, IsInt, IsOptional, Min } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Score extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsDefined()
    @IsInt()
    @Min(0)
    public first: number;

    @Column()
    @IsDefined()
    @IsInt()
    @Min(0)
    public second: number;

    @Column({nullable: true})
    @IsOptional()
    @IsInt()
    @Min(0)
    public third: number;
}
