import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface ClassConstructor {
    new (...args: any[]): {}
}

// Made this custom decorator to shorten the code
// Now it is shorten from this '@UseInterceptors(new SerializeInterceptor(UserDto))' to this ''@Serialize(UserDto`)
export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto :any) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Runs before the response returns
        return next.handle().pipe(
            map((data:any) => {
                return plainToClass(this.dto, data , {
                    excludeExtraneousValues : true, // Says that return only values that are exposed in the UserDto
                })
            })
        )
    }
}