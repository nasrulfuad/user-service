import { User } from 'src/user/entities/user.entity';

export function userFactory({
  id,
  email,
  name,
}: {
  id: number;
  name: string;
  email: string;
}) {
  return new User(id, name, email);
}
