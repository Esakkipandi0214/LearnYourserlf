import React from 'react'

const CoursComponent = () => {
  return (
    <div className=' w-full   p-3 flex flex-col lg:flex-row gap-2 rounded-lg bg-gray-700  text-black shadow-2xl'>
        <div className='  w-full lg:w-[50%] flex flex-col gap-2 bg-white p-2 rounded-lg'>
            <div className=' flex flex-col gap-1'>
            <h1 className=' text-black underline font-bold'>Course Name</h1>
            <h2 className=' text-black/75 font-medium'> Python Programming</h2>
            </div>
            <div className=' flex flex-col gap-1'>
            <h1 className=' text-black font-bold underline'>Course Description </h1>
            <p className=' text-black/75 font-medium'>Python is a versatile, high-level programming language known for its simplicity and readability, making it ideal for beginners and professionals alike.</p>
            </div>
            <div  className=' w-full relative h-12'>
                <div>
                <h1 className=' text-black font-bold underline'>Collabrators</h1>
                </div>
  <div className="relative w-full">
    <h1 className="absolute rounded-full p-1 bg-[#FCC6FF] w-7 text-white h-7 top-0 left-0">PP</h1>
    <h1 className="absolute rounded-full p-1 bg-[#E17564] w-7 text-white h-7 top-0 left-4">SP</h1>
    <h1 className="absolute rounded-full p-1 bg-[#A7B49E] w-7 text-white h-7 top-0 left-7">ARP</h1>
  </div>
</div>

        </div>
        <div className=' w-full lg:w-[50%]  grid grid-cols-2  lg:flex lg:flex-row  gap-2 justify-evenly items-center bg-white p-2 rounded-lg'>
            <div className=' flex flex-col justify-center items-center  gap-1'>
            <h1 className=' text-red-600 font-bold  text-xl '>Total Chapters</h1>
            <h2 className=' text-black/75 font-medium text-2xl'>12</h2>
            </div>
            <div className=' flex flex-col justify-center items-center  gap-1'>
            <h1 className=' text-blue-600 font-bold text-xl '>Total Modules </h1>
            <p className=' text-black/75 font-medium text-2xl'>24</p>
            </div>
            <div className=' flex flex-col justify-center items-center  gap-1'>
            <h1 className=' text-green-600 font-bold text-xl '>Progess</h1>
            <p className=' text-black/75 font-medium text-2xl'>50%</p>
            </div>
        </div>
    </div>
  )
}

export default CoursComponent