import RecordsTable from '../../components/RecordsTable'
import { api } from '../../api'
import { SITE } from '../../config'

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'email', label: 'Email' },
  { key: 'country', label: 'Country' },
  { key: 'apartment', label: 'Apartment' },
  { key: 'message', label: 'Message' },
]

export default function Customers() {
  return (
    <>
      <div className="admin__head">
        <h1>Customer DB</h1>
        <p>Enquiries submitted from the Contact Us and Home page forms.</p>
      </div>
      <RecordsTable
        fetcher={api.customers}
        columns={COLUMNS}
        waNumber={(r) => r.mobile}
        waMessage={(r) => `Hi ${r.name}, thank you for your enquiry about ${SITE.name}.`}
        emptyText="No customer enquiries yet."
      />
    </>
  )
}
