import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllData = async (userId) => {
    const existingData = await prisma.todo.findMany({
        where: {
            userid: parseInt(userId)
        }
    });
    console.log(existingData)
    return existingData
}

export const createData = async (title, completed,userId) => {
    const existingData = await prisma.todo.findFirst({
        where: {
            title: title,
            userid: parseInt(userId)
        }
    });
    if(existingData) throw new Error('EXIST')
        return await prisma.todo.create({ 
            data: {
                title,
                completed,
                userid: userId
            }
        });
}

export const UpdateData = async (id, title, completed, userId) => {
    const todo = await prisma.todo.findFirst({
        where: {
            AND: [
              { userid: parseInt(userId) },
              { todo_id: parseInt(id) }
            ]
          }
    })
    if(!todo) throw new Error('NOT_FOUND');
    if(todo.userid !== userId ) throw new Error('FORBIDDEN');
    return await prisma.todo.update({ 
        where: {
            todo_id: parseInt(id) 
          } , 
        data : {title,completed} 
    });
}


export const DeleteData = async (id, userId) => {
    const Data = await prisma.todo.findFirst({
        where : {
            AND: [
                { todo_id: parseInt(id) },
                { userid : parseInt(userId)}
              ]
        }
    })
    console.log(Data)
    console.log(userId)
    if(!Data){
        throw new Error('NOT_FOUND')
    }
    if(Data.userid !== parseInt(userId)){
        throw new Error('FORBIDDEN')
    };
    return await prisma.todo.delete({
        where : {todo_id : parseInt(id)}
    })
}