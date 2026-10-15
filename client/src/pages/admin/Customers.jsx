import RecordsTable from '../../components/RecordsTable'
import { api } from '../../api'
import { SITE } from '../../config'
import { COUNTRIES, CUSTOMER_STATUSES } from '../../data'

// EnquiryCust DB columns as listed by the client.
const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'home_address1', label: 'Home Address1' },
  { key: 'home_address2', label: 'Home Address2' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'country', label: 'Country', options: COUNTRIES },
  { key: 'email', label: 'Mail Id', type: 'email' },
  { key: 'contact_no', label: 'Contact Nos.', type: 'tel' },
  { key: 'whatsapp_no', label: 'WhatsApp Nos.', type: 'tel' },
  { key: 'created_at', label: 'Date' },
  { key: 'rent_amount', label: 'Rent Enq. Amount', type: 'number' },
  { key: 'message', label: 'Message', type: 'textarea' },
  { key: 'office_address1', label: 'Office Address1' },
  { key: 'office_no', label: 'Office No' },
  { key: 'status', label: 'Status', options: CUSTOMER_STATUSES },
]

export default function Customers() {
  return (
    <>
      <div className="admin__head">
        <h1>Customers List</h1>
        <p>Lease enquiries from the Contact Us and Home page forms. New enquiries start as “Enquired”.</p>
      </div>
      <RecordsTable
        fetcher={api.customers}
        update={api.updateCustomer}
        columns={COLUMNS}
        statuses={CUSTOMER_STATUSES}
        waMessage={(r) => `Hi ${r.name}, thank you for your lease enquiry at ${SITE.name}, West Mambalam.`}
        emptyText="No customer enquiries found."
        exportName="customers"
      />
    </>
  )
}
