import Container from "../component/Container";

export default function PrivacyScreen() {
  return (
    <Container title="Privacy">
      <div className="right-column-container">
        <p>At Note Goat, we are committed to customer privacy.</p>
        <p>But what does that mean exactly? Here is our commitment to you:</p>
        <hr />
        <h2>Scope</h2>
        <ul className="privacy-list">
          <li>We collect as little information as possible about our users</li>
          <li>Any data we do collect, incidentally or intentionally, is not for sale</li>
          <li>Any usage of user data will be in strict accordance with running this note service</li>
          <li>Any change to this document will be announced to users</li>
        </ul>
        <h2>Technical</h2>
        <ul className="privacy-list">
          <li>All notes for all users are encrypted on their device</li>
          <li>We do not collect the keys used to encrypt note data</li>
          <li>Loss of encryption keys results in irrevocable loss of notes</li>
        </ul>
        <h2>Legal</h2>
        <ul className="privacy-list">
          <li>Lawful subpoenas will be honored</li>
          <li>Otherwise, we will not provide user data to any law enforcement agencies</li>
        </ul>
        <hr />
        <p>
          This document was last updated Sept. 16, 2021 at 21:05.
        </p>
      </div>
    </Container>
  )
}
