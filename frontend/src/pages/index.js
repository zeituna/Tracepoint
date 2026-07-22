// src/pages/index.js
export { default as Dashboard } from './Dashboard'
export { default as Reports } from './Reports'
export { default as MapTracking } from './MapTracking'
export { default as FacialRecognition } from './FacialRecognition'
export { default as Messages } from './Messages'
export { default as Alerts } from './Alerts'
export { default as Statistics } from './Statistics'
export { default as Users } from './Users'
export { default as Organizations } from './Organizations'
export { default as CaseManagement } from './CaseManagement'
export { default as ReportsAnalytics } from './ReportsAnalytics'
export { default as Settings } from './Settings'
export { default as Chat } from './Chat'  // ← Add this line

// Public pages
export { default as Home } from './public/Home'
export { default as About } from './public/About'
export { default as Contact } from './public/Contact'
export { default as Features } from './public/Features'
export { default as Services } from './public/Services'
export { default as Faq } from './public/Faq'
export { default as Privacy } from './public/Privacy'
export { default as Terms } from './public/Terms'
export { default as Resources } from './public/Resources'
export { default as SafetyTips } from './public/SafetyTips'
export { default as SuccessStories } from './public/SuccessStories'
export { default as ReportMissing } from './public/ReportMissing'
export { default as SearchMissing } from './public/SearchMissing'
export { default as CaseDetails } from './public/CaseDetails'

// Auth pages
export { default as Login } from './Login'
export { default as UserRegister } from './UserRegister'
export { default as ForgotPassword } from './ForgotPassword'
export { default as ResetPassword } from './ResetPassword'

// User pages
export { default as UserDashboard } from './user/UserDashboard'
export { default as MyReports } from './user/MyReports'
export { default as UserReportMissing } from './user/ReportMissing'
export { default as UserProfile } from './user/Profile'

// Admin pages (if you have separate admin exports)
export { default as AdminDashboard } from './admin/Dashboard'
export { default as AdminReports } from './admin/Reports'
export { default as AdminUsers } from './admin/Users'
export { default as AdminSettings } from './admin/Settings'
export { default as AdminStatistics } from './admin/Statistics'
export { default as AdminAlerts } from './admin/Alerts'
export { default as AdminMessages } from './admin/Messages'
export { default as AdminOrganizations } from './admin/Organizations'
export { default as AdminCaseManagement } from './admin/CaseManagement'
export { default as AdminFacialRecognition } from './admin/FacialRecognition'
export { default as AdminGpsTracking } from './admin/GpsTracking'
export { default as AdminMapTracking } from './admin/MapTracking'
export { default as AdminReportsAnalytics } from './admin/ReportsAnalytics'

// Error pages
export { default as NotFound } from './NotFound'
export { default as Forbidden } from './Forbidden'

// System pages
export { default as SystemHealth } from './SystemHealth'
export { default as AuditLogs } from './AuditLogs'
export { default as BackupRestore } from './BackupRestore'
export { default as GpsTracking } from './GpsTracking'
export { default as SMSCommunication } from './SMSCommunication'
export { default as Partners } from './Partners'
export { default as Profile } from './Profile'