import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import CustomProduct from "./CustomProduct.model";
import Part from "./Part.model";

@Table({
  tableName: "custom_product_parts",
})
export default class CustomProductPart extends Model {
  @ForeignKey(() => CustomProduct)
  @Column
  declare customProductId: number;

  @ForeignKey(() => Part)
  @Column
  declare partId: number;
}
