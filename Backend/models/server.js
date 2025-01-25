import mongoose, {  Schema} from "mongoose"

const todoSchema = new Schema(
    {
        todoContent : {type : String , required :true},
        ip : {type : String}

    },
    {timestamps : true}
)

export const todoModel = mongoose.model("todoModel" , todoSchema)