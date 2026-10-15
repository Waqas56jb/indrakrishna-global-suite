import RecordsTable from '../../components/RecordsTable'
import { api } from '../../api'
import { SITE } from '../../config'
import { COUNTRIES, PAYMENT_MODES, REFERRAL_STATUSES } from '../../data'

// Referral DB columns as listed by the client (+ Message from the referral form).
const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'address1', label: 'Address1' },
  { key: 'address2', label: 'Address2' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'country', label: 'Country', options: COUNTRIES },
  { key: 'email', label: 'Mail Id', type: 'email' },
  { key: 'contact_no', label: 'Contact Nos.', type: 'tel' },
  { key: 'whatsapp_no', label: 'WhatsApp Nos.', type: 'tel' },
  { key: 'message', label: 'Message', type: 'textarea' },
  { key: 'created_at', label: 'Date' },
  { key: 'amount', label: 'Amount', type: 'number' },
  { key: 'status', label: 'Status', options: REFERRAL_STATUSES },
  { key: 'receipt_no', label: 'Receipt No.' },
  { key: 'payment_mode', label: 'Payment Mode', options: PAYMENT_MODES },
  { key: 'payment_date', label: 'Payment Date', type: 'date' },
]

export default function Referrals() {
  return (
    <>
      <div className="admin__head">
        <h1>Referral List</h1>
        <p>Referrals submitted from the Refer &amp; Earn page.</p>
      </div>
      <RecordsTable
        fetcher={api.referrals}
        update={api.updateReferral}
        columns={COLUMNS}
        statuses={REFERRAL_STATUSES}
        waMessage={(r) => `Hi ${r.name}, thank you for your referral to ${SITE.name}, West Mambalam.`}
        emptyText="No referrals found."
        exportName="referrals"
      />
    </>
  )
}
