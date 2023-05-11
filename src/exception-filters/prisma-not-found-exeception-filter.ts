import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExeceptionFilter implements ExceptionFilter{
    
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        
        exception.code == "P2025" 
        ? response.status(404).json({
                status: 404,
                message: exception.meta?.cause ?? exception.message,
            })
        : response.status(500).json({
            status: 500,
            message: exception.meta?.cause ?? exception.message,
        })
    }

}