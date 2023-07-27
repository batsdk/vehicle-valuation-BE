import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  //  Injecting the User Repository
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // Create only make an instance it does not save the user here
    return this.repo.save(user); // Saving the created user
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found with ID : ' + id);
    }
    Object.assign(user, attrs);
    this.repo.save(user);
  }

  async remove(id:number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found with ID : ' + id);
    }
    this.repo.remove(user);
  }
}
