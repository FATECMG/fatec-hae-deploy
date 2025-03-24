import { Comment, createdComment } from '../entities/Comment'

export interface ICommentUseCases {
  findComments(projectId: string): Promise<Comment[]>
  createComment(projectid: string, comment: createdComment): Promise<Comment>
}
