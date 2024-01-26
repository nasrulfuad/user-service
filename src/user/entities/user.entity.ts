import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: 1 })
  public id: number;

  @ApiProperty({ example: 'John Doe' })
  public name: string;

  @ApiProperty({ example: 'john@email.com' })
  public email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
