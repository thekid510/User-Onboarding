import { rest } from 'msw'
import { v4 as uuid } from 'uuid'

const users = [
  {
    id: uuid(),
    username:"james",
    password: 'Michael',
    email: 'michael@michael.com',
    role: 'student'
   
  },
]

function getAllFriends(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(users),
  )
}

function createNewFriend(req, res, ctx) {
  const {username, password, email, role } = req.body
  const requiredFields = {username, password, email, role  }

  if (Object.values(requiredFields).some(field => (!field || !field.trim()))) {
    return res(
      ctx.status(400),
      ctx.json({ message: 'Some required fields are missing or invalid.' }),
    )
  }

  if (req.body.hobbies && !Array.isArray(req.body.hobbies)) {
    return res(
      ctx.status(400),
      ctx.json({ message: 'The optional `hobbies` field must be an array.' }),
    )
  }

  const newFriend = { id: uuid(), ...req.body }
  users.unshift(newFriend)

  return res(
    ctx.status(201),
    ctx.json(newFriend),
  )
}

export const handlers = [
  rest.get('https://reqres.in/api/users', getAllFriends),
  rest.post('https://reqres.in/api/users', createNewFriend),
]
