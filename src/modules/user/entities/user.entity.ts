import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({ example: 1 })
  public id: number;

  @ApiProperty({ example: 'John Doe' })
  public name: string;

  @ApiProperty({ example: 'john@email.com' })
  public email: string;

  @Exclude()
  public _password: string;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this._password = password;
  }
}
