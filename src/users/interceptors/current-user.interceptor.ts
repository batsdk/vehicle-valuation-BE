import {ExecutionContext, NestInterceptor , INestApplicationContext,CallHandler,Injectable} from "@nestjs/common"
import { Observable } from 'rxjs';
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private userService: UsersService) {}

    async intercept(context: ExecutionContext, next: CallHandler){
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if(userId){
            const user = await this.userService.findOne(userId);

            // Assigning the user to request so we can use it in custom param decorator
            request.currentUser = user;
        }
        return next.handle() //Just go ahead and run the actual request handler
    }

}