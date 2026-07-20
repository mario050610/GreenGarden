import { Router } from 'express';
import { store, nextId } from '../data/store.js';
import { allowRoles } from '../middleware/auth.js';
const router=Router();
router.get('/:areaId',(req,res)=>res.json(store.thresholds.filter(x=>x.area_id===Number(req.params.areaId))));
router.post('/',allowRoles('admin','owner'),(req,res)=>{const areaId=Number(req.body.area_id);const type=req.body.sensor_type;let item=store.thresholds.find(x=>x.area_id===areaId&&x.sensor_type===type);const min=Number(req.body.min_value),max=Number(req.body.max_value);if(!Number.isFinite(min)||!Number.isFinite(max)||min>max)return res.status(400).json({message:'Ngưỡng không hợp lệ'});if(item)Object.assign(item,{min_value:min,max_value:max,warning_level:req.body.warning_level||item.warning_level,is_activated:req.body.is_activated??true});else{item={threshold_id:nextId(store.thresholds,'threshold_id'),area_id:areaId,sensor_type:type,min_value:min,max_value:max,warning_level:req.body.warning_level||'medium',is_activated:req.body.is_activated??true};store.thresholds.push(item);}res.json(item);});
export default router;
