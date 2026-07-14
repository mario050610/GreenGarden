import { Router } from 'express';
import { store, nextId } from '../data/store.js';
const router=Router();
router.get('/',(req,res)=>res.json(store.tasks.map(t=>({...t,area_name:store.areas.find(a=>a.area_id===t.area_id)?.area_name,assignee:store.users.find(u=>u.user_id===t.assigned_to)?.full_name}))));
router.post('/',(req,res)=>{const item={task_id:nextId(store.tasks,'task_id'),area_id:Number(req.body.area_id),assigned_to:Number(req.body.assigned_to||req.user.id),title:req.body.title,description:req.body.description||'',task_type:req.body.task_type||'care',scheduled_at:req.body.scheduled_at,status:'pending'};if(!item.title||!item.scheduled_at)return res.status(400).json({message:'Thiếu tiêu đề hoặc thời gian'});store.tasks.push(item);res.status(201).json(item);});
router.put('/:id/status',(req,res)=>{const item=store.tasks.find(x=>x.task_id===Number(req.params.id));if(!item)return res.status(404).json({message:'Không tìm thấy công việc'});item.status=req.body.status;if(item.status==='completed')item.completed_at=new Date().toISOString();res.json(item);});
export default router;
