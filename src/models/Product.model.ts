import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
  tableName: "products",
})
export default class Product extends Model {
  @Default("bicycle")
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare type: string; // Type of product (bicycle, ski, etc.)

  @Column({
    type: DataType.STRING,
    allowNull: false, // Name of the product
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false, // Base price of the product
  })
  declare price: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false, // Defines whether the product is available for sale
  })
  declare isAvailable: boolean;

  @Default(null)
  @Column({
    type: DataType.JSON,
    allowNull: true, // It can be null if no restrictions are applied
  })
  declare restrictions?: { [category: string]: string[] } | null;
}
