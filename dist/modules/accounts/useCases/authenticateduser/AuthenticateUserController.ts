
import {Request, Response} from "express"
import { container } from "tsyringe";
import { SimpleConsoleLogger } from "typeorm";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController{
    async handle(request: Request, response: Response):Promise<Response>{
        const {username, password} = request.body

        console.log(username)
        
        const authUser = container.resolve(AuthenticateUserUseCase)

        const user = await authUser.execute({username, password});
        console.log("Novo")
        console.log(user)

        const userRes ={

            username: user.username,
            email: user.email,
        }
        
        

        return response.json(userRes).send();
    }
}

export {AuthenticateUserController}