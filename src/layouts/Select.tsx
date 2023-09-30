import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/shadcn/ui/select'

interface SelectComponentProps {
  data: { value: string; label: string }[]
  disabled?: boolean | string[]
  selected: string | undefined
  setSelected: (selected: string) => void
}
const SelectComponent: React.FC<SelectComponentProps> = ({
  data,
  disabled,
  selected,
  setSelected,
}) => (
  <Select value={selected} onValueChange={(value) => setSelected(value)}>
    <SelectTrigger className='h-8 w-36 bg-white dark:border-slate-600 dark:bg-slate-700'>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {data.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            disabled={Array.isArray(disabled) && disabled.includes(item.value)}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
)

export default SelectComponent
