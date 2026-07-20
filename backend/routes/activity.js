import { Router } from 'express';
import { store } from '../data/store.js';
const router=Router();
const decorate=(c)=>({...c,device_name:store.devices.find(d=>d.device_id===c.device_id)?.device_name,area_name:store.areas.find(a=>a.area_id===store.devices.find(d=>d.device_id===c.device_id)?.area_id)?.area_name});
router.get('/',(req,res)=>res.json(store.commands.map(decorate)));
router.get('/:deviceId',(req,res)=>res.json(store.commands.filter(x=>x.device_id===Number(req.params.deviceId)).map(decorate)));
export default router;
