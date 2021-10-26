import { useState } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import EditUser from '../../components/EditUser'
import prisma from '../../lib/prisma'
import { deleteReq } from '../../lib/api'

export type User = {
  id: number
  username: string
  email: string
  role: string
}

interface Props {
  users: User[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  })

  if (!users || !users.length) {
    return {
      props: {
        users: [],
      },
    }
  }

  return { props: { users } }
}

const Admin: NextPage<Props> = ({ users }) => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const router = useRouter()

  const refreshData = () => {
    return router.replace(router.asPath)
  }

  const deleteUser = async (id: number) => {
    const data = await deleteReq(`/user/${id}`)

    if (!data) {
      alert('Error deleting user')
    }

    refreshData()
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user) => (
              <TableRow key={`${user.id}${user.username}`}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setUserToEdit(user)
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell align="center">
                  {user.role !== 'ADMIN' && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteUser(user.id)}
                    >
                      X
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {userToEdit && (
        <EditUser
          user={userToEdit}
          onClose={() => setUserToEdit(null)}
          onSuccess={refreshData}
        />
      )}
    </>
  )
}

export default Admin
