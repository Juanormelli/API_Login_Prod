import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";



class UsersRepositoryInMemory implements IUserRepository{
  
    users: User[] = []

    async create({username, password, email, id}:ICreateUserDTO): Promise<User> {
        const user = new User()
        
        Object.assign(user, {username, password, email})

        this.users.push(user)
        console.log(this.users)
        return user
        
    }
    async findByUserName(username: string): Promise<User> {
        const user = this.users.find(user => user.username === username)

        return user

    }
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email)

        return user
    }

    comparePassword(username:string,password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}

export{UsersRepositoryInMemory}