import { Author } from '@/domain/project/entities/Project'

export interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
}

export interface createdComment extends Omit<Comment, 'id' | 'timestamp'> {}
