---
title: Ubuntu - Install & Setting
publishedAt: 2026-10-17T15:59:25.833Z
order: 1
---


# I. Install
- Install gõ tiếng việt
- Install VSCode

- GNOME Tweaks (Tinh chỉnh GNOME): `sudo apt install gnome-tweaks`
- Extension Manager: `sudo apt install gnome-shell-extension-manager` 
- Dconf Editor: `sudo apt install dconf-editor`

- Docker

# II. Setting
1. Hiển thị app tương ứng mỗi màn hình:
`gsettings set org.gnome.shell.extensions.dash-to-dock isolate-monitors true`

2. Thêm "New Document" vào chuột phải tại thư mục bất kỳ
```
mkdir -p ~/Templates
touch ~/Templates/"Demo.txt"
```