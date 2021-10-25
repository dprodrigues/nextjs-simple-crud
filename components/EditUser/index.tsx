import type { FC } from 'react'
import type { User } from '../../pages/admin'
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useForm } from 'react-hook-form'

interface Props {
  user: User | null
  onClose: () => void
  onSuccess: () => Promise<boolean>
}

type FormData = {
  username?: string
  email?: string
}

const EditUser: FC<Props> = ({ user, onClose, onSuccess }) => {
  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: user ?? {},
  })

  const onSubmit = async (data: FormData) => {
    const url = `/api/user/${user?.id}`

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    if (!Object.keys(data).length) {
      alert('No data to update')
      return
    }

    const response = await fetch(url, options)

    if (response.ok) {
      onSuccess()
    } else {
      alert('Error updating user')
    }

    onClose()
  }

  return (
    <Dialog open={Boolean(user)} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column">
          <TextField
            label="Username"
            sx={{ marginBottom: '12px' }}
            {...register('username', { required: true})}
          />

          <TextField
            label="Email"
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/ })}
          />
        </Box>

        <DialogActions>
          <Button variant="contained" type="submit" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser
