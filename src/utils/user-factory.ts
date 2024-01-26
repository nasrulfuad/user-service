import { User } from '../modules/user/entities/user.entity';

export function userFactory({
  id,
  email,
  name,
}: {
  id: number;
  name: string;
  email: string;
  password?: string;
}) {
  return new User(id, name, email, null);
}
