import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

// scrypt is a callback value, we are turning it into a promise
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string){

        // Check if the Email is already exists
        const isUserExists = await this.usersService.find(email);
        if (isUserExists.length) {
            throw new BadRequestException("Email is already in use");
        }

        // Hash the user password
        // Generate a salt
        const salt = randomBytes(8).toString("hex");

        // Hash the salt and the password together
        const hash = (await scrypt(password,salt,32)) as Buffer;

        // Join the hash result and the salt together
        const result = salt+"."+hash.toString("hex");

        // Create a new User and Save it
        const user = await this.usersService.create(email,result);

        // return the user
        return user;

    }

    async signin(email: string, password: string){

        const [user] = await this.usersService.find(email)

        if (!user) {
            throw new NotFoundException("Wrong email or password");
        }

        const [salt,storeHash] = user.password.split(".")

        const hash = await (scrypt(password, salt, 32)) as Buffer

        if (storeHash !== hash.toString("hex")) {
            throw new BadRequestException("Wrong email or password")
        }
        return user;

    }

}