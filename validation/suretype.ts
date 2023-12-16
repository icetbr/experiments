import { v } from "suretype"

const userSchema = v.object( {
    firstName: v.string({}).matches(/a/).maxLength(1).required()
    lastName: v.string( ),
    age: v.number( ).gte( 21 ),
} );
