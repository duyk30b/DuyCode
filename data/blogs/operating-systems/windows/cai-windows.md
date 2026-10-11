---
title: Cài Windows
publishedAt: 2026-10-11T15:10:58.376Z
order: 0
---



I. Download Windows và Office
-----------------------------

### 1. Windows và Office bản gốc Microsoft

#### 1.1. Link tổng hợp:

-- Link 1: [https://docs.google.com/spreadsheets/d/1o5dmOw8jBCVGxFmlMOsKgoIKULMY7tk-TCSz67IJMc4/pubhtml](https://docs.google.com/spreadsheets/d/1o5dmOw8jBCVGxFmlMOsKgoIKULMY7tk-TCSz67IJMc4/pubhtml) 

-- Link 2: [https://docs.google.com/spreadsheets/d/14-D4tIlFp9APP0OOvQBRXvfLOYC447UygywenX5LXfo/edit#gid=960687212](https://docs.google.com/spreadsheets/d/14-D4tIlFp9APP0OOvQBRXvfLOYC447UygywenX5LXfo/edit#gid=960687212)

#### 1.2. Window

-- Win 7 Sp1x64 Professional: SHA1: 0BCFC54019EA175B1EE51F6D2B207A3D14DD2B58 

-- Win 7 Sp1x32 Professional: SHA1: D89937DF3A9BC2EC1A1486195FD308CD3DADE928

-- Win 10: Win10_22H2_EnglishInternational_x64v1.iso: SHA1: DC3982AD27E2D4E03B680630C28F824CB78BCD47 

#### 1.3. Office

-- Office_ProPlus_2013_SP1x32 (Bản VLSC): d4d7ffd3dffef0a3c08748e400e0890a7a730888 

-- Link GoogleDriver: [https://drive.google.com/file/d/1SpuzzZSFvtbVWOX6qqofHWoOi4ngDC8\_/view](https://drive.google.com/file/d/1SpuzzZSFvtbVWOX6qqofHWoOi4ngDC8_/view) 

-- Office_ProPlus_2013_SP1x64 (Bản VLSC): ab2c2d525d63a72e0a2dc66efdcea0f824f02cff 

-- Link GoogleDriver: [https://drive.google.com/file/d/1KSsy1l2hkDIzEvOYWZapjZILQ\_XY0Dbe/view](https://drive.google.com/file/d/1KSsy1l2hkDIzEvOYWZapjZILQ_XY0Dbe/view) 

-- Office 2019 Pro Plus 64bit Retail: [https://officecdn.microsoft.com/pr/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/Office/Data/SetupProPlus2019Retail.x64.en-us.exe](https://officecdn.microsoft.com/pr/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/Office/Data/SetupProPlus2019Retail.x64.en-us.exe)

### 2\. Công cụ

#### 2.1. Check key Online

[https://quanghuy.it/check-key](https://quanghuy.it/check-key) [http://khoatoantin.com/pidms](http://khoatoantin.com/pidms) [https://dbmer.com/checkkey/](https://dbmer.com/checkkey/)

#### 2.2. Get Confirmation ID:

[http://khoatoantin.com/cidms](http://khoatoantin.com/cidms) - User: HQCNTH - Pass: MIGOI - User: trogiup24h- Pass: PHO [https://getcid.top/](https://getcid.top/) [https://0xc004c008.com/](https://0xc004c008.com/) [https://getcid.info/](https://getcid.info/)

II. Cài Win và Ghost
--------------------

### 1\. Tạo USB cài Win

\- Dùng phần mềm Rufus: [https://rufus.akeo.ie/?locale=vi\_VN](https://rufus.akeo.ie/?locale=vi_VN)

### 2\. Bolus cần biết

\- Hiểu thế nào về "BIOS" và "UEFI", "MBR" và "GPT", "Legacy" ![BIOS vs UEFI](https://www.passmoz.com/images/others/firmware-workflow.jpg) - Có thể hiểu đơn giản: "UEFI" là chẩn mới đang dần thay thế cho chuẩn cũ "BIOS", từ "Legacy" - nghĩa là BIOS - UEFI chỉ hỗ trợ cho các phiên bản Windows 64-bit - Nếu sử dụng chuẩn "UEFI" > cần định dạng ổ cứng là "GPT" - Nếu sử dụng chuẩn "Legacy" > cần định dạng ổ cứng là "MBR"

#### a. Kiểm tra BIOS Mode

\- Vào: Run\\ msinfo32 - Kéo xuống phần BIOS Mode: "UEFI" hoặc "Legacy" - Nếu máy tính có hỗ trợ chuẩn "UEFI", có thể vào BIOS để chuyển qua lại giữa 2 chuẩn này

#### b. Kiểm tra định dạng ổ cứng

\- Vào: Run\\ diskpart -> đánh lệnh: list disk - Tại đây máy tính sẽ được hiện thị tất cả các ổ cứng - Tại cột “Gpt”: nếu có dấu \* --> chuẩn "GPT", còn nếu không có --> chuẩn "MBR"

III. Active Windows và Office
-----------------------------

\-- Tham khảo thêm: [https://vn-z.vn/threads/tong-hop-key-windows-va-office.10945/](https://vn-z.vn/threads/tong-hop-key-windows-va-office.10945/)

### 1\. Windows 10

Đầu tiên bạn phải chạy Cmd (Quyền Admin) **Bước 1:** Kiểm tra xem Windows đã Active hay chưa theo các lệnh sau:

> slmgr.vbs /dli ##Hiển thị thông tin giấy phép cơ bản slmgr.vbs /dlv ##Hiển thị thông tin giấy phép đầy đủ slmgr.vbs /xpr ##Hiển thị ngày hết hạn của giấy phép

**Bước 2:** Đưa Windows về trạng thái chưa nhập Key nào bằng các lệnh:

> slmgr.vbs /upk ##Gỡ bỏ key slmgr.vbs /cpky ##Gỡ key khỏi Registry slmgr.vbs /rearm ##Reset kích hoạt

Sau khi thực hiện 3 lệnh trên bạn phải khởi động lại máy tính **Bước 3:** Điền Key bằng lệnh:

> slmgr.vbs -ipk XXXXX-XXXXX-XXXXX-XXXXX-XXXXX

**Bước 4:** Lấy ID2 Windows nhanh theo lệnh sau

> slmgr.vbs /dti>step2.txt start step2.txt

**Bước 5:** Lấy ID3 theo hướng dẫn ở đây: [http://khoatoantin.com/cidms](http://khoatoantin.com/cidms) - User: HQCNTH - Pass: MIGOI - User: trogiup24h- Pass: PHO [https://getcid.top/](https://getcid.top/) **Bước 6:** Điền ID3 (không dấu gạch ngang) theo lệnh:

> slmgr.vbs /atp ID3

**Bước 7:** Kích hoạt Windows theo lệnh sau slmgr.vbs -ato **Bolus:** Một số lệnh CMD khác của Windows

> slmgr.vbs /rilc - Reset lại license được lưu trong hệ thống slmgr.vbs /skms (Đặt máy chủ KMS) slmgr.vbs /ckms - Xoá máy chủ KMS

### 2\. Office

**Bước 1:** Trỏ vào folder của Office (tương ứng như sau: 14 - Office 2010, 15 - Office 2013, 16 - Office 2016,2019):

> set ver=16 if exist "%ProgramFiles%\\Microsoft Office\\Office%ver%\\ospp.vbs" cd /d "%ProgramFiles%\\Microsoft Office\\Office%ver%" if exist "%ProgramFiles(x86)%\\Microsoft Office\\Office%ver%\\ospp.vbs" cd /d "%ProgramFiles(x86)%\\Microsoft Office\\Office%ver%"

**Bước 2:** Add Key mới

> cscript ospp.vbs /inpkey:

**Bước 3:** Convert từ bản Retail sang Volume

> for /f %i in ('dir /b ..\\root\\Licenses16\\ProPlus2019VL\_MAK\*.xrm-ms') do cscript ospp.vbs /inslic:"..\\root\\Licenses16\\%i"

**Bước 4:** Lấy step 2:

> cscript OSPP.VBS /dinstid>step2.txt start step2.txt

**Bước 5:** Điền step 3:

> cscript OSPP.VBS /actcid:<8\_nhóm\_CID\_viết\_liền>

**Bước 6:** Kiểm tra tình trạng bản quyền (key cũ đã điền - chỉ hiện 5 ký tự cuối của tất cả các key đã up)

> cscript ospp.vbs /dstatus (Hiện thông tin kích hoạt với key hiện tại) cscript ospp.vbs /dstatusall (Hiện thông tin kích hoạt đầy đủ)

**Bolus:** Kích hoạt nhanh Office 2019 Pro Plus 64bit Retail:

> cscript slmgr.vbs /upk 52c4d79f-6e1a-45b7-b479-36b666e0a2f8 cscript slmgr.vbs /upk 5f472f1e-eb0a-4170-98e2-fb9e7f6ff535 cscript slmgr.vbs /upk a3072b8f-adcc-4e75-8d 62-fdeb9 bdfae57 if exist "%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs" cd /d "%ProgramFiles%\\Microsoft Office\\Office16" if exist "%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs" cd /d "%ProgramFiles(x86)%\\Microsoft Office\\Office16" cscript ospp.vbs /remhst cscript ospp.vbs /ckms-domain for /f %i in ('dir /b ..\\root\\Licenses16\\ProPlus2019VL\_MAK\*.xrm-ms') do cscript ospp.vbs /inslic:"..\\root\\Licenses16\\%i" cscript //nologo ospp.vbs /inpkey:GP3YN-RPX2T-FVYT8-4TPFY-7MKG3 cscript //nologo ospp.vbs /act cscript //nologo ospp.vbs /dinstid > step2.txt start step2.txt cls cscript ospp.vbs /actcid:

\- Lấy step3 như ở trên rồi điền nốt vào -> Finish

### 2\. Sao lưu bản quyền office 2019

\- Bước 1: Dùng CMD

> cd C:\\Windows\\System32 net stop sppsvc

\- Backup: Trong thư mục: C:\\Windows\\System32\\spp\\store ==> Lưu lại thư mục 2.0 - Restore: copy đè ngược lại là xong

IV. Driver
----------

### 1. Driver HP EliteBook 8570p - Windows 7 x64bit

-- Link Full: [https://support.hp.com/us-en/drivers/selfservice/hp-elitebook-8570p-notebook-pc/5212912](https://support.hp.com/us-en/drivers/selfservice/hp-elitebook-8570p-notebook-pc/5212912) 

-- LAN: [https://ftp.hp.com/pub/softpaq/sp60501-61000/sp60775.exe](https://ftp.hp.com/pub/softpaq/sp60501-61000/sp60775.exe) 

-- Wifi: [https://ftp.hp.com/pub/softpaq/sp58501-59000/sp58782.exe](https://ftp.hp.com/pub/softpaq/sp58501-59000/sp58782.exe) 

-- Graphics: [https://ftp.hp.com/pub/softpaq/sp57001-57500/sp57174.exe](https://ftp.hp.com/pub/softpaq/sp57001-57500/sp57174.exe) 

-- Audio: [https://ftp.hp.com/pub/softpaq/sp60001-60500/sp60317.exe](https://ftp.hp.com/pub/softpaq/sp60001-60500/sp60317.exe) 

-- Toupad: [https://ftp.hp.com/pub/softpaq/sp63501-64000/sp63779.exe](https://ftp.hp.com/pub/softpaq/sp63501-64000/sp63779.exe) 

-- Bluetooth (64bit): [https://ftp.hp.com/pub/softpaq/sp66001-66500/sp66402.exe](https://ftp.hp.com/pub/softpaq/sp66001-66500/sp66402.exe) 

-- Canon Printer: [https://vn.canon/vi/support/0100278201/9](https://vn.canon/vi/support/0100278201/9)

### 2. Driver HP Probook 6460b - Windows 7

-- Link Full: [https://support.hp.com/us-en/drivers/selfservice/hp-probook-6460b-notebook-pc/5045594](https://support.hp.com/us-en/drivers/selfservice/hp-probook-6460b-notebook-pc/5045594) 

-- LAN - x32x64: [https://ftp.hp.com/pub/softpaq/sp60501-61000/sp60775.exe](https://ftp.hp.com/pub/softpaq/sp60501-61000/sp60775.exe) 

-- Wifi - x32x64: [https://ftp.hp.com/pub/softpaq/sp58501-59000/sp58782.exe](https://ftp.hp.com/pub/softpaq/sp58501-59000/sp58782.exe) 

-- Graphics x32: [https://ftp.hp.com/pub/softpaq/sp64501-65000/sp64729.exe](https://ftp.hp.com/pub/softpaq/sp64501-65000/sp64729.exe) 

-- Graphics x64: [https://ftp.hp.com/pub/softpaq/sp64501-65000/sp64730.exe](https://ftp.hp.com/pub/softpaq/sp64501-65000/sp64730.exe)