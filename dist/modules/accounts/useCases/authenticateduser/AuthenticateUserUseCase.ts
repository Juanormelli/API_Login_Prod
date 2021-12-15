import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../error/AppError";
import { IAuthUserDTO } from "../../dtos/IAuthUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";




@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,
    ){}

    async execute({username, password}:IAuthUserDTO): Promise<User>{
        const auth = await this.usersRepository.findByUserName(username)
        console.log("entrei aqui")
        console.log(auth)

        if (!auth){
            throw new AppError("Username or password is incorect!")
        }

        const authOK = await this.usersRepository.comparePassword(username, password)
        console.log(authOK)
        if (authOK === false){
            
            throw new AppError("Username or password is incorect!")
            
        }
        
        console.log(auth)
        return auth
        
        
    }
}

export {AuthenticateUserUseCase}