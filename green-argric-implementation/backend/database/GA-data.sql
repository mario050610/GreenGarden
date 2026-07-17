USE GreenArgric;
GO
INSERT INTO Role(role_name,description) VALUES ('admin',N'Quản trị viên'),('owner',N'Chủ vườn'),('technician',N'Kỹ thuật viên');
INSERT INTO [User](role_id,full_name,email,password_hash,status) VALUES
(1,N'Nguyễn Văn An','admin@greenargric.edu.vn','plain:demo123','active'),
(2,N'Trần Minh Khoa','owner@greenargric.edu.vn','plain:demo123','active'),
(3,N'Lê Thu Hà','tech@greenargric.edu.vn','plain:demo123','active');
INSERT INTO HydroponicArea(area_name,location,crop_type,description,status) VALUES
(N'Khu A',N'Nhà màng phía Đông',N'Rau muống',N'Khu trồng rau ăn lá','active'),
(N'Khu B',N'Nhà màng trung tâm',N'Xà lách xanh',N'Khu trồng xà lách','active');
INSERT INTO Sensor(area_id,sensor_code,sensor_type,unit,mqtt_topic,status) VALUES
(1,'TEMP-A1','temperature',N'°C','greenargric/area/1/sensor/TEMP-A1/data','online'),
(1,'HUM-A1','humidity',N'%','greenargric/area/1/sensor/HUM-A1/data','online'),
(1,'PH-A1','ph',N'pH','greenargric/area/1/sensor/PH-A1/data','online'),
(1,'EC-A1','ec',N'mS/cm','greenargric/area/1/sensor/EC-A1/data','online'),
(1,'LIGHT-A1','light',N'lux','greenargric/area/1/sensor/LIGHT-A1/data','online'),
(1,'WATER-A1','water_level',N'%','greenargric/area/1/sensor/WATER-A1/data','online');
INSERT INTO Device(area_id,device_code,device_name,device_type,command_topic,status_topic,status,mode) VALUES
(1,'PUMP-CIRC-A',N'Máy bơm tuần hoàn A','circulation_pump','greenargric/area/1/device/PUMP-CIRC-A/set','greenargric/area/1/device/PUMP-CIRC-A/status','ON','AUTO'),
(1,'LED-A',N'Đèn LED A','grow_light','greenargric/area/1/device/LED-A/set','greenargric/area/1/device/LED-A/status','OFF','AUTO'),
(1,'FAN-A',N'Quạt thông gió A','fan','greenargric/area/1/device/FAN-A/set','greenargric/area/1/device/FAN-A/status','ON','AUTO'),
(1,'DOSING-A',N'Bơm châm dinh dưỡng A','dosing_pump','greenargric/area/1/device/DOSING-A/set','greenargric/area/1/device/DOSING-A/status','OFF','MANUAL');
INSERT INTO ThresholdConfig(area_id,sensor_type,min_value,max_value,warning_level) VALUES
(1,'temperature',22,30,'medium'),(1,'humidity',60,85,'low'),(1,'ph',5.8,6.5,'high'),(1,'ec',1.2,2.2,'high'),(1,'light',500,1200,'low'),(1,'water_level',40,100,'high');
GO
