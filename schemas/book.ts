import { z } from 'zod';
import { idSchema } from '../middlewares/idValidator';

const DATE_REGEXP = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

/**
 * @swagger
 * components:
 *  schemas:
 *    BookDto:
 *      type: object
 *      properties:
 *        isbn:
 *          type: string
 *          description: The ISBN of the Book
 *          example: 978-3-16-148410-01
 *        title:
 *          type: string
 *          description: The title of the Book
 *          example: The Lord of the Rings
 *          minLength: 2
 *          maxLength: 100
 *          required: true
 *        image:
 *          type: string
 *          description: The image of the Book
 *          example: https://example.com/image.jpg
 *          format: url
 *          required: true
 *        publisher:
 *          type: string
 *          description: The publisher of the Book
 *          example: Harper Collins
 *          minLength: 2
 *          maxLength: 100
 *          required: true
 *        publishedDate:
 *          type: string
 *          description: The publication date of the Book
 *          example: 2021-01-01
 *          format: date
 *          required: true
 *        status:
 *          type: string
 *          description: The status of the Book (available or borrowed)
 *          example: available
 *          enum: [available, borrowed]
 *          default: available
 *        borrowerId:
 *          type: string
 *          description: The id of the borrowerId
 *          example: 5f9d88b9d4f0f5b2a4f9d9b9
 *          format: uuid
 *          required: false
 *          nullable: true
 *          default: null
 *        borrowDate:
 *          type: string
 *          description: The date of the borrow
 *          example: 2021-01-01
 *          format: date
 *          required: false
 *          nullable: true
 *          default: nullable
 *        returnDate:
 *          type: string
 *          description: The date of the return
 *          example: 2021-01-01
 *          format: date
 *          required: false
 *          nullable: true
 *          default: null
 */
export const BookDtoSchema = z.object({
  isbn: z.string({ required_error: 'Please provide ISBN' }).min(2).max(13),
  title: z.string({ required_error: 'Please provide title' }).min(2).max(100),
  image: z
    .string({ required_error: 'Please provide image' })
    .url('Please provide a somewhat valid url.'),
  publisher: z.string({ required_error: 'Please provide publisher' }).min(2).max(100),
  publishedDate: z
    .string({ required_error: 'Please provide publishedDate' })
    .regex(DATE_REGEXP, 'Please provide a valid date. Example: 2021-01-01'),
  status: z.enum(['available', 'borrowed']).default('available'),
  borrowerId: z.string().optional(),
  borrowDate: z
    .string()
    .regex(DATE_REGEXP, 'Please provide a valid borrowDate. Example: 2021-01-01')
    .optional(),
  returnDate: z
    .string()
    .regex(DATE_REGEXP, 'Please provide a valid returnDate. Example: 2021-01-01')
    .optional(),
  authors: z.array(idSchema).optional(),
  genres: z.array(idSchema).optional(),
});

export const BookIsbnParamSchema = z.object({
  isbn: z.string({ required_error: 'Please provide ISBN' }),
});

export const BookFiltersSchema = z.object({
  author: z.string().optional().default(''),
  genre: z.string().optional().default(''),
  title: z.string().optional().default(''),
  status: z.enum(['available', 'borrowed', '']).optional().default(''),
});
