import { useToast } from '@/lib/shadcn/ui/use-toast.ts'

import { errorToast } from '@/helpers/toast.ts'

const Custom: React.FC = () => {
  const { toast } = useToast()
  return (
    <button
      className='pt-14'
      onClick={() => {
        toast(errorToast)
      }}
    >
      Toast
    </button>
  )
}

export default Custom
