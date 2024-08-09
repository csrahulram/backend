import * as mongoose from 'mongoose';
import {User, type UserType} from './schema/user';
import {Hono} from 'hono';

const app = new Hono();

mongoose.connect('mongodb://127.0.0.1:27017/mongoose-app')
    .then(() => console.log('Connnection success..'))
    .catch((e)=>console.log('Err in connection : ',e)
);

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

const getUserById = async (id: string) => {
    const users = await User.findById(id);
    return users;
}

const updateUser = async (user: UserType&{_id: string}) => {
    const res = await User.findByIdAndUpdate({_id: user._id},user);
    return res;
}

const deleteUser = async (id: string) => {
    const res = await User.findByIdAndDelete({_id: id});
    return res;
}

app.get('/', (c) => 
    c.text('Welcome to the App!')
);

app.get('/users', async (c) => {
    const result = getAllUsers();
    return c.json(await result)
});

app.get('/user/:id', async (c) => {
    return c.json(await getUserById(c.req.param().id))
});

app.post('/adduser', async(c) => {
    const result = await c.req.json()
    return c.json(result);
});

app.put('/updateuser', async(c) => {
    const user: UserType & {_id: string} = await c.req.json();    
    const res = await updateUser(user);
    return c.json(res);
});

app.delete('/removeuser/:id', async(c) => {
    return c.json(await deleteUser(c.req.param().id))
});

export default app;
