import { Input } from "../common/ui/input";
import { Label } from "../common/ui/label";

const dimensionsOptions = [
  { label: "W", property: "width" },
  { label: "H", property: "height" },
  { label: "rx", property: "rx" },
  { label: "ry", property: "ry" },
];

type Props = {
  width: string;
  height: string;
  rx?: string;
  ry?: string;
  isEditingRef: React.MutableRefObject<boolean>;
  handleInputChange: (property: string, value: string) => void;
};

const Dimensions = ({ ry, rx, width, height, isEditingRef, handleInputChange }: Props) => (
  <section className='flex flex-col border-b border-borderColor'>
    <h3 className="pt-4 px-5 text-sm">Position</h3>
    <div className='flex flex-col gap-4 px-6 py-3'>
      {dimensionsOptions.map((item) => (
        <div
          key={item.label}
          className='flex flex-1 items-center gap-3 rounded-sm'
        >
          <Label htmlFor={item.property} className='text-[10px] font-bold'>
            {item.label}
          </Label>
          <Input
            type='number'
            id={item.property}
            placeholder={item.property === 'width' || item.property === 'height' ? "100" : "0"}
            value={
              item.property === 'width' ? width :
              item.property === 'height' ? height :
              item.property === 'rx' ? rx || '' :
              item.property === 'ry' ? ry || '' : ''
            }
            className='input-ring'
            min={10}
            onChange={(e) => handleInputChange(item.property, e.target.value)}
            onBlur={() => {
              isEditingRef.current = false;
            }}
          />
        </div>
      ))}
    </div>
  </section>
);

export default Dimensions;
