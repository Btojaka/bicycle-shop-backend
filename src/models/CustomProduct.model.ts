import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  BelongsToMany,
} from "sequelize-typescript";
import Part from "./Part.model";
import CustomProductPart from "./CustomProductPart.model";

@Table({
  tableName: "custom_products",
})
export default class CustomProduct extends Model {
  @Default("bicycle")
  @Column({
    type: DataType.STRING,
    allowNull: false, // Example: "bicycle", "ski" comes from frontend
  })
  declare typeProduct: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string; // Example: "Mountain bike", "Ski set" comes from frontend

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number; // Total price of the custom product comes from frontend

  @BelongsToMany(() => Part, () => CustomProductPart) // Many to many relationship itermediate table
  declare parts: Part[];
}
