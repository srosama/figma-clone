import { exportToPdf } from "../../lib/utils";
import { Button } from "../common/ui/button";


const Export = () => (
  <div className='flex flex-col gap-3 px-5 py-3'>
    <h3 className='text-[10px] uppercase'>Export</h3>
    <Button 
      variant="noneUse"
      className='w-full border border-primary-grey-100 text-black
       bg-white hover:bg-transparent hover:border-gray-400 hover:text-gray-400'

      onClick={exportToPdf}
    >
      Export to PDF
    </Button>
  </div>
);

export default Export;
