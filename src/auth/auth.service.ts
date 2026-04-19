import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user.isActive) {
      throw new UnauthorizedException("User account is inactive");
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
    };
  }

  async changeEmail(userId: string, dto: ChangeEmailDto) {
    const user = await this.usersService.findById(userId);

    const isPasswordValid = await user.validatePassword(dto.currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    const existing = await this.usersService.findByEmail(dto.newEmail).catch(() => null);
    if (existing && existing.id !== userId) {
      throw new ConflictException("Email is already in use");
    }

    await this.usersService.update(userId, { email: dto.newEmail });

    return { message: "Email updated successfully" };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.usersService.findById(userId);

    const isPasswordValid = await user.validatePassword(dto.currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });

    return { message: "Password updated successfully" };
  }

  async validateUser(userId: string) {
    return await this.usersService.findById(userId);
  }
}
