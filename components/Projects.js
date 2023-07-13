import Image from 'next/image';

const statuses = {
    Ontime: 'text-green-600 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-500 bg-gray-50 ring-gray-200',
    Overdue: 'text-red-600 bg-red-50 ring-red-600/10',
}
const clients = [
    {
      id: 1,
      name: 'Tuple',
      imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
      lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '48%', status: 'Overdue' },
    },
    {
      id: 2,
      name: 'SavvyCal',
      imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
      lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '99.98%', status: 'Ontime' },
    },
    {
      id: 3,
      name: 'Reform',
      imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
      lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '82%', status: 'Ontime' },
    },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Projects() {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold leading-7 text-gray-200">Recent Projects</h2>
            <a href="#" className="text-sm font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              View all<span className="sr-only">, projects</span>
            </a>
          </div>
          <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
            {clients.map((client) => (
              <li key={client.id} className="overflow-hidden rounded-xl border border-gray-500 bg-gray-800">
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-700 p-6">
                    <Image
                        src={client.imageUrl}
                        alt={client.name}
                        width={12}
                        height={12}
                        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                    />
                  <div className="text-sm font-medium leading-6 text-gray-200">{client.name}</div>
  
                </div>
                <dl className="-my-3 divide-y divide-gray-600 px-6 py-4 text-sm leading-6">
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-400">Expected Due Date</dt>
                    <dd className="text-gray-300">
                      <time dateTime={client.lastInvoice.dateTime}>{client.lastInvoice.date}</time>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-400">Probability</dt>
                    <dd className="flex items-start gap-x-2">
                      <div className="font-medium text-gray-200">{client.lastInvoice.amount}</div>
                      <div
                        className={classNames(
                          statuses[client.lastInvoice.status],
                          'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                        )}
                      >
                        {client.lastInvoice.status}
                      </div>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  
