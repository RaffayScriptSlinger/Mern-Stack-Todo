import { models, Schema} from "mongoose"

const todoSchema = new Schema(
    {
        todoContent : {type : String , require :true},
        ip : {type : String}

    },
    {timestamps : true}
)

export const todoModel = models("todoModel" , todoSchema)