import React from 'react';
import Link from 'next/link';

export default function Button({
  text,
  size,
  shape,
  weight,
  IconComponent,
  type,
  href,
  onClick,
  ...props
}) {
  const buttonClasses = [
    'inline-flex',
    'items-center',
    'gap-x-1.5',
    'rounded-md',
    'bg-indigo-600',
    'px-2.5',
    'py-1.5',
    'text-sm',
    'font-semibold',
    'text-white',
    'shadow-sm',
    'hover:bg-indigo-500',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-indigo-600',
  ];

  return (
    <button
      type={type || 'button'}
      className={buttonClasses.join(' ')}
      onClick={onClick}
      {...props}
    >
      {IconComponent && <IconComponent className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
      {text}
    </button>
  );
}
