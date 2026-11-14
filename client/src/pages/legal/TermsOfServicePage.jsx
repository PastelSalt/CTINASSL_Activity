import PolicyPage from './PolicyPage'
import source from '../../../../docs/terms-of-service.md?raw'

export default function TermsOfServicePage() {
  return <PolicyPage currentPath="/terms-of-service" source={source} />
}
