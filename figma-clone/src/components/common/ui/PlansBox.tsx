import { uploadIcon } from '../../../utils'
import { Button } from './button'

export default function plansBox() {

  return (
    <div className='flex justify-center items-center pt-3 pb-3'>
      <div className='bg-[#383838] h-44 w-[16rem] flex flex-col items-center justify-center rounded-lg text-center'>

        <div className='pt-6'>
          <img src={uploadIcon} width={30} alt="Upload Icon" />
        </div>

        <div className='pt-3'>
          <p className='text-white text-sm'>
            Ready to go beyond this free plan? <br />
            Upgrade for premium features.
          </p>
        </div>

        <div className="mt-auto pb-5">
          <Button className='bg-[#0C8CE9] w-[13rem] hover:bg-white hover:text-black'
          
          >View plans </Button>
        </div>

      </div>
    </div>
  )
}
