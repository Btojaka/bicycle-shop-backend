import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  BelongsToMany,
} from "sequelize-typescript";
import CustomProduct from "./CustomProduct.model";
import CustomProductPart from "./CustomProductPart.model";

@Table({
  tableName: "parts",
})
export default class Part extends Model {
  @Default("bicycle")
  @Column({
    type: DataType.STRING,
    allowNull: false, // Example: "bicycle", "ski"
  })
  declare typeProduct: string;

  @Column({
    type: DataType.STRING,
    allowNull: false, // Example: "Frame Type", "Wheels"
  })
  declare category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false, // Example: "diamond", "mountain wheels"
  })
  declare value: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false, // Part price
  })
  declare price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false, // Stock quantity
    defaultValue: 0,
  })
  declare quantity: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false, // Availability of the part
  })
  declare isAvailable: boolean;

  @BelongsToMany(() => CustomProduct, () => CustomProductPart) // Many to many relationship itermediate table
  declare customProducts: CustomProduct[];
}
