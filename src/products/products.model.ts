import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model {
    @Column(DataType.STRING) declare name: string;
    @Column(DataType.TEXT) declare description: string;
    @Index @Column(DataType.STRING) declare category: string;
    @Index @Column(DataType.DECIMAL(10, 2)) declare price: number;
    @Index @Column(DataType.DATE) declare createdAt: Date;
}