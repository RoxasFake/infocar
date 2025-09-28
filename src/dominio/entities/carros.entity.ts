import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('carros')
export class CarrosEntity {  
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 7 })
    placa: string;

    @Column({ length: 100 })
    modelo: string;

    @Column({ length: 100 })
    marca: string;

    @Column()
    ano: number;

    @Column({ length: 17 })
    chassi: string;

    @Column({ length: 11 })
    renavam: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}