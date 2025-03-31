import { AppDataSource } from "../config/db";
import { User } from "../entitiy/User.entity";


export const userRepo =AppDataSource.getRepository(User);