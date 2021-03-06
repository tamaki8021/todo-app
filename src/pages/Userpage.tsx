import React from 'react'
import { useAppSelector } from '../reducks/store/hooks'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

const Userpage: React.FC = () => {
  const username = useAppSelector((state) => state.user.username)

  return (
    <div className='c-section-container'>
      <h2>マイページ</h2>
      <div className='module-spacer--small'></div>
      <TextField label='ユーザー名' value={username} />
      <Link to='/todo' >todoに戻る</Link>
    </div>
  )
}

export default Userpage
