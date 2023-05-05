import { Transform } from "class-transformer"
import { IsDate, IsDateString, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    readonly product_name: string

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 7})
    readonly product_price: number

    @IsNotEmpty()
    @IsInt()
    readonly product_quantity: number

    @IsNotEmpty()
    @IsDateString()
    readonly product_expiration_date: Date

    @IsNotEmpty()
    @IsString()
    readonly product_category: string

}
