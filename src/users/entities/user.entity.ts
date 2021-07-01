import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  // id for login
  @Column() loginId: string;

  @Column() password: string;

  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() updated_at: Date;

  @DeleteDateColumn() deleted_at: Date;
}