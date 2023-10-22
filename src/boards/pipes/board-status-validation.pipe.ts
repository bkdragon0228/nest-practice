import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export default class BoardStatusValidationPipe implements PipeTransform {
  readonly statusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metaData: ArgumentMetadata) {
    value.toUpperCase();

    if (this.isStatusvValid(value)) {
      return new BadRequestException(`${value} is not in stautus options`);
    }

    return value;
  }

  private isStatusvValid(status) {
    const index = this.statusOption.indexOf(status);
    return index;
  }
}
