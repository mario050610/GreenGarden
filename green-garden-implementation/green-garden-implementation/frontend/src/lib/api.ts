const API_URL=import.meta.env.VITE_API_URL||'http://localhost:3000';
export class ApiError extends Error{status:number;constructor(status:number,message:string){super(message);this.status=status;}}
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{
 const token=localStorage.getItem('greenGardenToken');
 const response=await fetch(`${API_URL}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`} : {}),...(options.headers||{})}});
 const data=await response.json().catch(()=>({}));
 if(!response.ok)throw new ApiError(response.status,data.message||'Yêu cầu thất bại');
 return data as T;
}
