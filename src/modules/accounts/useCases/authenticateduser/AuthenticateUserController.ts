
import {Request, Response} from "express"
import { container } from "tsyringe";
import { SimpleConsoleLogger } from "typeorm";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController{
    async handle(request: Request, response: Response):Promise<Response>{
        const {username, password} = request.body

    
        
        const authUser = container.resolve(AuthenticateUserUseCase)

        const user = await authUser.execute({username, password});
        
        const userRes ={

            username: user.username,
            email: user.email,
        }
        
        

        return response.json(userRes).send();
    }
}

export {AuthenticateUserController}