import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const target = this.boards.find((board) => board.id === id);

    if (!target) {
      throw new NotFoundException(`Can't find board id ${id}`);
    }
    return target;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;

    const board: Board = {
      title,
      description,
      status: BoardStatus.PUBLIC,
      id: uuid(),
    };

    this.boards.push(board);

    return board;
  }

  deleteBoard(id: string): void {
    const target = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== target.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
