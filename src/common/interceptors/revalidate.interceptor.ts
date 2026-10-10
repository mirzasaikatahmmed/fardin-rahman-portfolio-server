import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const IGNORED_PATHS = ["/api/contact", "/api/auth", "/api/activities/visits"];

@Injectable()
export class RevalidateInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RevalidateInterceptor.name);

  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      originalUrl: string;
      user?: unknown;
    }>();

    const shouldNotify =
      MUTATING_METHODS.has(request.method) &&
      Boolean(request.user) &&
      !IGNORED_PATHS.some((path) => request.originalUrl.startsWith(path));

    if (!shouldNotify) {
      return next.handle();
    }

    return next.handle().pipe(tap(() => void this.notifyFrontend()));
  }

  private async notifyFrontend(): Promise<void> {
    const url = this.configService.get<string>("FRONTEND_REVALIDATE_URL");
    const secret = this.configService.get<string>("REVALIDATION_SECRET");
    if (!url || !secret) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) {
        this.logger.warn(`Frontend revalidation returned ${response.status}`);
      }
    } catch (error) {
      this.logger.warn(
        `Frontend revalidation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
