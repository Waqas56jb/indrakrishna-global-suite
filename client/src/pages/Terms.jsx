import PageHero from '../components/PageHero'
import { SITE } from '../config'
import { IMAGES } from '../data'

export default function Terms() {
  return (
    <>
      <PageHero title="Terms & Conditions" image={IMAGES.interior} />
      <section className="section">
        <div className="container narrow prose">
          <h2>Referral Bonus Scheme Policy</h2>
          <p>
            The following terms &amp; conditions are applicable only when both the referrer and the referee have taken the
            flat on lease with {SITE.name}.
          </p>
          <p><strong>Referral Bonus for Customers: {SITE.referral.bonus} per unit</strong>, applicable to:</p>
          <ul>
            <li>Customers referring family / friends to {SITE.name}.</li>
            <li>Customers who take 2 or more flats on lease.</li>
          </ul>

          <h2>Payment &amp; Cancellation</h2>
          <ul>
            <li>
              The referral bonus payment will be initiated after both the referee and the referrer have taken the flat on
              lease, and after 2 years of the lease agreement being registered.
            </li>
            <li>
              The referral bonus amount (TDS deduction will be applicable) will be adjusted towards the payment schedule of
              the referrer’s unit.
            </li>
            <li>In case of cancellation of a property taken on lease, the referrer shall not be entitled to the referral bonus.</li>
            <li>
              In case of cancellation of a property taken on lease where the customer has already redeemed his/her bonus
              payout, the amount shall be recovered.
            </li>
          </ul>

          <h2>Use of Information</h2>
          <p>We may, and you authorize us to, use and disclose any information, including personal information:</p>
          <ul>
            <li>
              that we deem necessary, in our sole discretion, to comply with any applicable law, regulation, legal process,
              or governmental request;
            </li>
            <li>
              in order to investigate, prevent or take action regarding illegal activities, suspected fraud, situations
              involving potential threats to the physical safety of any person, or as otherwise required by law.
            </li>
          </ul>
          <p>
            Your personal information may be disclosed as part of any merger, sale of company assets or acquisition, as well
            as in the event of insolvency, bankruptcy or receivership, in which personal information would be transferred as
            one of the business assets of the Company.
          </p>

          <h2>General</h2>
          <p>
            Thank you for visiting {SITE.name}. We may update some facilities, which are subject to change.{' '}
            {SITE.company} &amp; {SITE.name}, their sole proprietors &amp; subordinates will not be responsible for any
            events and activities.
          </p>
          <p>The terms &amp; conditions of this referral bonus payout can be changed at any time, with or without notice.</p>
        </div>
      </section>
    </>
  )
}
