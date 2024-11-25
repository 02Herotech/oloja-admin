"use client"

import Button from '@/components/global/Button'
import { signOut } from 'next-auth/react'
import React from 'react'

const Settings = () => {

  return (
    <div>
      <h2>Settings</h2>
      <Button onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  )
}

export default Settings