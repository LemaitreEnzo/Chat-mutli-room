import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { DataTypes } from "sequelize";

import { sequelize } from "../config/db";

interface Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  id: CreationOptional<number>;
  text: string;
}

export const Message = sequelize.define<Message>("Message", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  text: {
    type: DataTypes.STRING,
  },
});
