import Button from './Button';
import { CheckCircleIcon } from '@heroicons/react/20/solid'

export default function Header({ title, action }) {
  return (
    <>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                {title}
              </h2>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              {action && <Button text={action} />}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
