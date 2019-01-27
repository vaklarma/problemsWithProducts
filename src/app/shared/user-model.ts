export class UserModel {
  id: string;
  email: string;
  password: string;
  name: string;
  permission: string;
  profilePictureUrl: string;

  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }
}
