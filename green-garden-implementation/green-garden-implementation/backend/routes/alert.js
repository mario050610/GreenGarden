import { Router } from 'express';
import { store } from '../data/store.js';
import { allowRoles } from '../middleware/auth.js';
const router=Router();
router.get('/',(req,res)=>{let rows=[...store.alerts];if(req.query.status)rows=rows.filter(x=>x.status===req.query.status);res.json(rows.map(x=>({...x,area_name:store.areas.find(a=>a.area_id===x.area_id)?.area_name})));});
router.post('/:id/resolve',allowRoles('admin','owner','technician'),(req,res)=>{const item=store.alerts.find(x=>x.alert_id===Number(req.params.id));if(!item)return res.status(404).json({message:'Không tìm thấy cảnh báo'});item.status='resolved';item.resolved_at=new Date().toISOString();item.resolved_by=req.user.id;res.json(item);});
export default router;
