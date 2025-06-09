import * as DataServices from '../services/DataServices.js'

export const getAllData = async (req,res) => {
    const userId = req.session.user?.id;
    console.log(req.session.user)
    try {
        const todos = await DataServices.getAllData(userId);
        res.json(todos)
        console.log(todos)
    } catch(error) {
        res.status(500).json({message : "Failed To fetch Data"})
    }
}

export const createData = async (req,res) => {
        const {title, completed} = req.body;
        const userId = req.session.user?.id;
        try {
            const create = await DataServices.createData(title,completed,userId);
            res.status(201).json({
                message : "Data Created",
                data : create
            })
        } catch(error){
            if (error.message === 'EXIST'){
                return res.status(404).json({ message : 'Data Exist' });
            }
            res.status(500).json( {
                message : 'Failed To Create Data'
            })
        }
}

export const UpdateData = async (req,res) => {
    const { id } = req.params ;
    const { title, completed } = req.body;
    const userId = req.session.user?.id;
    try {
        const UpdateData = await DataServices.UpdateData(id,title,completed, userId);
        res.status(201).json({
            message : 'Data Updated',
            data : UpdateData
        })
    } catch (error) {
        if(error.message === 'FORBIDDEN'){
            return res.status(403).json({ message : 'You are not authorized to update this todo' })
        } else if (error.message === 'NOT_FOUND'){
            return res.status(404).json({ message : 'Todo Not Found' });
        }
        res.status(500).json( {
            message : 'Failed To Update Data'
        })
    }
}

export const DeleteData = async (req,res) => {
    const { id } = req.params;
    const userId = req.session.user?.id;
    try {
        const DeleteTodos = await DataServices.DeleteData(id,  userId);
        res.status(201).json({
            message : 'Data Deleted',
            data : DeleteTodos
        })
    } catch (error) {
        if(error.message === 'FORBIDDEN'){
            return res.status(403).json({ message : 'You are not authorized to update this todo' })
        } 
        res.status(500).json( {
            message : 'Failed To Update Data'
        })
    }
}