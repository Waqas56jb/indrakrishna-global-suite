import RecordsTable from '../../components/RecordsTable'
import { api } from '../../api'
import { SITE } from '../../config'

const COLUMNS = [
  { key: 'referrer_name', label: 'Referred By' },
  { key: 'referrer_mobile', label: 'Referrer Mobile' },
  { key: 'friend_name', label: 'Friend Name' },
  { key: 'friend_mobile', label: 'Friend Mobile' },
  { key: 'friend_email', label: 'Friend Email' },
  { key: 'country', label: 'Country' },
  { key: 'message', label: 'Notes' },
]

export default function Referrals() {
  return (
    <>
      <div className="admin__head">
        <h1>Referral DB</h1>
        <p>Referrals submitted from the Refer &amp; Earn page.</p>
      </div>
      <RecordsTable
        fetcher={api.referrals}
        columns={COLUMNS}
        waNumber={(r) => r.friend_mobile}
        waMessage={(r) =>
          `Hi ${r.friend_name}, ${r.referrer_name} referred you to ${SITE.name}, West Mambalam – apartments for lease. Can we share details?`}
        emptyText="No referrals yet."
      />
    </>
  )
}
