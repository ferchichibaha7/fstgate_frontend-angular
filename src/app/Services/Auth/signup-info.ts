export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    password: string;
    role: number;
    group: number;

    constructor(name: string, username: string, email: string, password: string, role: number, group: number) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.group = group;

    }
}
