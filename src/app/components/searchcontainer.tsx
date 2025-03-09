"use client"
import Image from "next/image";
import {useRouter} from "next/navigation";

const Search = () => {

const router=useRouter();

const handleSearch =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
   const name = formData.get("name") as string;
   
   if(name){

    router.push(`/products?name=${name}`)

   }
};

  return (
    <form className="flex items-center gap-2 bg-gray-100 p-1 rounded-md" onSubmit={handleSearch}>
      <input 
        type='text' name="name" 
        placeholder="Search" 
        className="w-40 md:w-60 lg:w-80 bg-transparent outline-none"
      />
      <button className="cursor-pointer">
        <Image src="/Search.png" alt="" width={12} height={12} />
      </button>
    </form>
  )
}

export default Search