import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import Cursor from './Cursor.jsx'
import CookieConsent from './CookieConsent.jsx'
import Toast from './Toast.jsx'
import DemoModal from './modals/DemoModal.jsx'
import ROIModal from './modals/ROIModal.jsx'
import StartModal from './modals/StartModal.jsx'
import SalesModal from './modals/SalesModal.jsx'
import ChatWidget from './ChatWidget/index.jsx'

export default function Layout({ children }) {
  return (
    <>
      <Cursor />
      <Nav />
      <main className="pt-24">{children}</main>
      <Footer />
      <CookieConsent />

      {/* Global modals */}
      <DemoModal />
      <ROIModal />
      <StartModal />
      <SalesModal />

      <Toast />

      {/* Floating AI chat widget - connects to Dialogflow */}
      <ChatWidget />
    </>
  )
}
