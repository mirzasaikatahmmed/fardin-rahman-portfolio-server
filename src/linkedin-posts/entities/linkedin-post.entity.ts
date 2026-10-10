import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity("linkedin_posts")
export class LinkedInPost extends BaseEntity {
  @Column({ type: "varchar", length: 500 })
  url: string;

  @Column({ type: "text", nullable: true })
  caption: string;

  @Column({ type: "int", default: 0 })
  order: number;

  @Column({ type: "boolean", default: true })
  isPublished: boolean;
}
