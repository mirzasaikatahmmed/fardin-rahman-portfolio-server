import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";

@Entity("section_visibility")
export class SectionVisibility extends BaseEntity {
  @Column({ type: "jsonb" })
  sections: Record<string, boolean>;
}
