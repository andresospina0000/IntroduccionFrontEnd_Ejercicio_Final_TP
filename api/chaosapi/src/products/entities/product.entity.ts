import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('products')
export class Product {

    @PrimaryColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    marca: string;

    @Column()
    descripcion: string;

    @Column()
    imgPath: string;

    @Column()
    oferta: number;
}
