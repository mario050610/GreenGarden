import 'dotenv/config';import mqtt from'mqtt';
const broker=process.env.MQTT_BROKER||'mqtt://127.0.0.1:1883';const base=process.env.MQTT_BASE_TOPIC||'greenargric';const area=Number(process.env.AREA_ID||1);const interval=Number(process.env.INTERVAL_MS||5000);
const client=mqtt.connect(broker,{username:process.env.MQTT_USERNAME||undefined,password:process.env.MQTT_PASSWORD||undefined});
const sensors=[['TEMP-A1','temperature','°C',27.8,.7],['HUM-A1','humidity','%',72,3],['PH-A1','ph','pH',6.3,.2],['EC-A1','ec','mS/cm',1.95,.15],['LIGHT-A1','light','lux',680,60],['WATER-A1','water_level','%',72,4]];
const jitter=(base,range)=>Number((base+(Math.random()-.5)*2*range).toFixed(2));
client.on('connect',()=>{console.log(`MQTT simulator connected: ${broker}`);setInterval(()=>{for(const[code,type,unit,value,range]of sensors){const payload={type,value:jitter(value,range),unit,timestamp:new Date().toISOString(),quality:'good'};const topic=`${base}/area/${area}/sensor/${code}/data`;client.publish(topic,JSON.stringify(payload));console.log(topic,payload.value,unit)}},interval)});
client.on('error',e=>console.error(e.message));
