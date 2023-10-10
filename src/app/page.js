

export default function Home() {
  return (
    <>
      <div className='h-screen pt-10 p-10 bg-gray-300'>
         <div className='flex justify-between'>
           <div>
             <span className='text-5xl font-bold block text-amber-900'>မင်းသိင်္ခ</span>
             <span>လက်ထောက်ဗေဒင်</span>
           </div>
           <div>
               <div className="w-full max-w-md">
                 <div className="mb-4">
                   <input type="text" className="input input-bordered rounded-lg" placeholder="သိလိုသည်များကိုရှာဖွေပါ..."/>
                 </div>
               </div>
           </div>
         </div>
      </div>
    </>
  )
}
