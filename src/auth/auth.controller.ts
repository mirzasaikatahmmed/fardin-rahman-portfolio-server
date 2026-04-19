import { Controller, Post, Body, Get, Patch, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeNameDto } from "./dto/change-name.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Public } from "./decorators/public.decorator";
import { CurrentUser } from "./decorators/current-user.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 200, description: "Login successful", type: AuthResponseDto })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({ status: 200, description: "User profile retrieved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getProfile(@CurrentUser() user: any) {
    return user;
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get current authenticated user" })
  @ApiResponse({ status: 200, description: "User information retrieved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async getMe(@CurrentUser() user: any) {
    return user;
  }

  @Patch("change-name")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Change admin name" })
  @ApiResponse({ status: 200, description: "Name updated successfully" })
  async changeName(@CurrentUser() user: any, @Body() dto: ChangeNameDto) {
    return this.authService.changeName(user.id, dto);
  }

  @Patch("change-email")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Change admin email" })
  @ApiResponse({ status: 200, description: "Email updated successfully" })
  @ApiResponse({ status: 401, description: "Current password is incorrect" })
  @ApiResponse({ status: 409, description: "Email already in use" })
  async changeEmail(@CurrentUser() user: any, @Body() dto: ChangeEmailDto) {
    return this.authService.changeEmail(user.id, dto);
  }

  @Patch("change-password")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Change admin password" })
  @ApiResponse({ status: 200, description: "Password updated successfully" })
  @ApiResponse({ status: 401, description: "Current password is incorrect" })
  async changePassword(@CurrentUser() user: any, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, dto);
  }
}
