import type{ReactNode}from'react';
export function PageTitle({title,subtitle,action}:{title:string;subtitle:string;action?:ReactNode}){return <div className="page-title"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>}
export function Card({children,className=''}:{children:ReactNode;className?:string}){return <div className={`card ${className}`}>{children}</div>}
export function Badge({children,tone='green'}:{children:ReactNode;tone?:string}){return <span className={`badge ${tone}`}>{children}</span>}
export function Loading(){return <div className="loading">Đang tải dữ liệu...</div>}
export function ErrorBox({message}:{message:string}){return <div className="error-box">{message}</div>}
