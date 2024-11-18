import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth-guard';
import { ErrorCode } from '../../../../exceptions/error-code';
import { ErrorException } from '../../../../exceptions/error-exception';

@ApiTags('Film')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'api' })
export class FilmController {
  @ApiOperation({ summary: 'Get a list of all films from server B' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Film list found',
  })
  @Get('/filmA')
  async getFilm(@Res() res: Response) {
    try {
      const response = await fetch(
        `http://localhost:${process.env.APP_PORT_B}/api/filmB`,
        {
          method: 'GET',
          headers: {
            'x-client-id': process.env.SERVERB_CLIENT_ID,
            'x-client-secret': process.env.SERVERB_CLIENT_SECRET,
          },
        },
      );

      if (response.status === HttpStatus.UNAUTHORIZED) {
        throw new ErrorException(
          ErrorCode.UNAUTHORIZED,
          'Can not access server B without identifying',
          undefined,
        );
      } else if (response.status === HttpStatus.BAD_REQUEST) {
        throw new ErrorException(
          ErrorCode.UNDEFINED_ERROR,
          `Can not access server B with status code ${response.status}`,
          undefined,
        );
      }

      const data = await response.json();

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        error.message,
        undefined,
      );
    }
  }
}
