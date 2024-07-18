interface UserDto {
    name: string;
    username: string;
    password: string;
    nivel: boolean;
}

class UserDto {
    constructor(data: UserDto) {
        this.name = this.validateName(data.name);
        this.username = this.validateUsername(data.username);
        this.password = this.validatePassword(data.password);
        this.nivel = data.nivel;
    }

    private validateName(name: string) {
        if (!name || name.trim() === '') {
            throw new Error("Name is a required field.");
        }
        return name;
    }

    private validateUsername(username: string) {
        if (!username || username.trim() === '') {
            throw new Error("Username is a required field.");
        }
        return username;
    }

    private validatePassword(password: string) {
        if (!password || password.trim() === '') {
            throw new Error("Password is a required field.");
        }
        return password;
    }
}

export default UserDto;