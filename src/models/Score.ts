import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDefined, IsInt, IsOptional, IsPositive, Min } from "class-validator";

@Entity()
export class Score extends BaseEntity {
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
