import { ProfileSidebar } from './mobile/Profile'
import styles from './ProfilePage.module.css'

export function ProfilePage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.sidebarWrap}>
          <ProfileSidebar />
        </div>
      </div>
    </main>
  )
}
