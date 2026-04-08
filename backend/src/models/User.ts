import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
class User extends Model {
// O símbolo "!" informa ao TypeScript que estas propriedades serão
// inicializadas pelo Sequelize, e não pelo construtor da classe.
public id!: number;
public email!: string;
public password!: string;
}
User.init({
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true
},

password: {
type: DataTypes.STRING,
allowNull: false
}
}, {
sequelize,
modelName: 'User',
hooks: {
beforeSave: async (user: any) => {
if (user.changed('password')) {
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);
}
}
}
});
export default User;