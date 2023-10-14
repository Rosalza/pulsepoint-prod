import React from 'react'

export default async function page() {

  async function handle(data: FormData) {
    'use server'
    console.log('test!')
  }

  return (
    <div>
      <form action={handle}>
        <input type='email' name='email' />
        <input type='password' name='password' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
