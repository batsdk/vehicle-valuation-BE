import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose() // Expose means the response can see this
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;
  //   Obj -> Original report entity
  @Transform(({obj: report})=> report.user.id )
//   Above : Saying get the original report object and set its user id to the below value and expose it
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;

}
