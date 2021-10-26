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
import { put } from '../../lib/api'

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
  const { handleSubmit, register, reset } = useForm<FormData>({
    defaultValues: user as FormData,
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (data: FormData) => {
    const submited = await put(`user/${user?.id}`, data)

    if (!Object.keys(data).length) {
      alert('No data to update')

      return
    }

    if (submited) {
      onSuccess()
    } else {
      alert('Error updating user')
    }

    handleClose()
  }

  return (
    <Dialog open={Boolean(user)} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          sx={{ paddingTop: '12px' }}
        >
          <TextField
            label="Username"
            sx={{ marginBottom: '12px' }}
            {...register('username', { required: true })}
          />

          <TextField
            label="Email"
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/ })}
          />
        </Box>

        <DialogActions>
          <Button variant="contained" type="submit" onClick={handleClose}>
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
