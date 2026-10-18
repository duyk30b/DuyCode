---
title: Ubuntu - Install & Setting
publishedAt: 2026-10-17T15:59:25.833Z
order: 1
---

# I. Install
## 1. Install gõ tiếng việt
```
sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo
sudo apt-get update
sudo apt-get install ibus ibus-bamboo --install-recommends
ibus restart
env DCONF_PROFILE=ibus dconf write /desktop/ibus/general/preload-engines "['BambooUs', 'Bamboo']" && gsettings set org.gnome.desktop.input-sources sources "[('xkb', 'us'), ('ibus', 'Bamboo')]"
```
-- GNOME
Truy cập cấu hình bộ gõ Settings > Keyboard > Input Sources Switching > Switch input sources individually for each window.

## 2. Install App Config
- GNOME Tweaks (Tinh chỉnh GNOME): `sudo apt install gnome-tweaks`
- Extension Manager: `sudo apt install gnome-shell-extension-manager` 
- Dconf Editor: `sudo apt install dconf-editor`

## 3. Install nvm
```
sudo apt update
sudo apt install -y curl git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
```

## 4. Install Git
```
git config --global user.name "Duy-MSIGF75-Ubuntu"
git config --global user.email "duyk30b@gmail.com"
```

## Other
- Install VSCode Portable
- Docker
- SSH


# II. Setting
1. Hiển thị app tương ứng mỗi màn hình:
`gsettings set org.gnome.shell.extensions.dash-to-dock isolate-monitors true`

2. Thêm "New Document" vào chuột phải tại thư mục bất kỳ
```
mkdir -p ~/Templates
touch ~/Templates/"Demo.txt"
```