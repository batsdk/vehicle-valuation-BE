import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const {session} = context.switchToHttp().getRequest()

        // If the auth gaurd return true then user can visit that endpoint
        // We are checking if the session in the request available, if the userId exists then user can use the endpoint
        return session.userId;

    }
}