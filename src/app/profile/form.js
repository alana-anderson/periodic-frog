"use client";

import { useState } from 'react';
import Alert from '@/components/Alert';
import { signIn, signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';

export const ProfileForm = ({ session }) => {
  const [name, setName] = useState(session.name);
  const [email, setEmail] = useState(session.email);
  const [username, setUsername] = useState(session.username);
  const [alertStatus, setAlertStatus] = useState('hidden');

  const onSubmit = async event => {
    event.preventDefault()
    
    // Get the ID from the session
    const id = session?.id;
    console.log(JSON.stringify({ id, name, username, email }))

    // Send a request to your API endpoint with the updated data
    const res = await fetch('/api/user/update', {
      method: 'POST',
      body: JSON.stringify({ id, name, username, email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const data = await res.json();
  
      // Update the Next-Auth session with the new user data
      const updateRes = await fetch('/api/session/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.user),
        credentials: 'same-origin', // Include credentials
      });
    } else {
      // handle failed user update
    }
  }

  return (
    <div className="divide-y divide-white/5">
      <Alert type="success" message="Profile updated successfully" />
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
              <h2 className="text-base font-semibold leading-7 text-white">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">Your profile information both public and private.</p>
          </div>

        <form className="md:col-span-2">
          <input type="hidden" id="id" name="id" value={session?.id} />

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
                <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                <button
                    type="button"
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                >
                    Change avatar
                </button>
                <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-white">
                Name
                </label>
                <div className="mt-2">
                <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    defaultValue={session.name}
                    onChange={e => setName(e.target.value)}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
                </label>
                <div className="mt-2">
                <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="Email Address"
                    defaultValue={session.email}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    onChange={e => setEmail(e.target.value)}
                />
                </div>
            </div>

            <div className="col-span-full">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
                </label>
                <div className="mt-2">
                <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                    <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                    knomadic.com/
                    </span>
                    <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                    defaultValue={session.username}
                    onChange={e => setUsername(e.target.value)}
                    />
                </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
            <button
                onClick={onSubmit}
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                Save
            </button>
            </div>
        </form>
        </div>
    </div>
  )
}
