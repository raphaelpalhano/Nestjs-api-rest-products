import { Transform } from "class-transformer"
import { IsDate, IsDateString, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator"

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    readonly product_name: string

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 7})
    @Min(0)
    readonly product_price: number

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    readonly product_quantity: number

    @IsNotEmpty()
    @IsDateString()
    readonly product_expiration_date: Date

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly category_id: number;

}
