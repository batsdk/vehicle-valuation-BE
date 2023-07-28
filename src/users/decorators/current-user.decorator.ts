import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(

    // Param decorators exist outside the DI system, so our decorator can't get an instance of UsersService directly

    (data:never, context: ExecutionContext)=> {
        const request = context.switchToHttp().getRequest();
        if(request.session?.userId){

            // Accessing the CurrentUser property setuped in the interceptor
            return request.currentUser;
        } else return null;
    }
)