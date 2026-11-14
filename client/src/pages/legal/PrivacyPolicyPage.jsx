import PolicyPage from './PolicyPage'
import source from '../../../../docs/privacy-policy.md?raw'

export default function PrivacyPolicyPage() {
  return <PolicyPage currentPath="/privacy-policy" source={source} />
}
